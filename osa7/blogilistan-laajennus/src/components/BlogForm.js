import React, { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"

const BlogForm = (props) => {

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
      await props.createBlog(newBlog)
      props.setNotification(`a new blog "${newBlog.title}" by ${newBlog.author} added`)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch(exception) {
      console.log(exception)
      props.setNotification("Failed to add a new blog")
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

const ConnectedBlogForm = connect(null, { createBlog, setNotification })(BlogForm)
export default ConnectedBlogForm