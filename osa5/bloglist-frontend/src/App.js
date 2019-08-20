import React, { useState, useEffect } from 'react';
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(sortBlogs(result))
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in user", username)
    try {
      const userResponse = await loginService.login({
        username, password
      })

      window.localStorage.setItem("loggedInUser", JSON.stringify(userResponse))

      blogService.setToken(userResponse.token)
      setUser(userResponse)
      setUsername("")
      setPassword("")
      console.log("login succesful!")
    } catch(exception) {
      setNotification("wrong username or password")
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await blogService.update(blog.id, newBlog)
      setBlogs(sortBlogs(blogs.map(b => b.id === blog.id ? newBlog : b)))
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleDelete = async (blog) => {
    try {
      if(window.confirm(`Do you really want to delete blog "${blog.title}"?`)){
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (exception) {
      setNotification(`no permission to delete blog "${blog.title}"`)
      console.log(exception.message)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification}/>
        <form onSubmit={handleLogin}>
          <div>username 
            <input 
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>password 
            <input 
              type="password" 
              value={password} 
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Toggleable buttonLabel="new blog">
        <BlogForm 
          blogs={blogs} 
          setBlogs={setBlogs} 
          setNotification={setNotification}
        />
      </Toggleable>
      <Blogs handleLike={handleLike} handleDelete={handleDelete} blogs={blogs} />
    </div>
  )
}

const Blogs = ({ handleLike, handleDelete, blogs}) => {

  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default App;
