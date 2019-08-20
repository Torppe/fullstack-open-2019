import React, { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const BlogForm = ({ blogs, setBlogs, setNotification }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const result = await blogService.create(newBlog)
      setBlogs(blogs.concat(result))
      setTitle("")
      setAuthor("")
      setUrl("")

      setNotification(`a new blog "${result.title}" by ${result.author} added`)
      setTimeout(() => {
        setNotification("")
      }, 5000)
    } catch(exception) {
      setNotification("Failed to add a new blog")
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>Title:
        <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>Author:
        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>Url:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm