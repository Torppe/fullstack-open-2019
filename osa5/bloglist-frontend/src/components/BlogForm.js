import React, { useState } from "react"
import blogService from "../services/blogs"

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
      const result = await blogService.create(newBlog)
      props.setBlogs(props.blogs.concat(result))
    } catch(exception) {
      console.log("error while adding a new blog",exception.message)
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
      <button type="submit" >create</button>
    </form>
  )
}

export default BlogForm