import React, { useState, useEffect } from 'react';
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
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
      console.log("login failed", exception.message)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App;
