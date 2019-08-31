import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { likeBlog, deleteBlog, createComment } from "../reducers/blogReducer"
import { connect } from "react-redux"

const Blog = (props) => {
  const [comment, setComment] = useState("")

  const blogById = id => {
    return props.blogs.find(b => b.id === id)
  }
  const blog = blogById(props.id)

  const handleLike = async (blog) => {
    try {
      props.likeBlog(blog)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Do you really want to delete blog "${blog.title}"?`)) {
        await props.deleteBlog(blog.id)
        props.setNotification(`Deleted blog "${blog.title}"`)
        props.history.push("/")
      }
    } catch (exception) {
      props.setNotification(`no permission to delete blog "${blog.title}"`)
      console.log(exception.message)
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    await props.createComment(blog, comment)
    setComment("")
  }

  if(!blog){
    return null
  }

  return(
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
      <div>Added by {blog.user ? blog.user.name : ""}</div>
      <button onClick={() => handleDelete(blog)}>delete</button>

      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, index) =>
          <li key={index}>{c}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification,
  createComment
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default withRouter(ConnectedBlog)