import React, { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { Button, Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

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
      <Typography variant="h5" component="h2" gutterBottom>
        Create new
      </Typography>
      <div>
        <TextField
          label="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          label="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          margin="normal"
          variant="outlined"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">create</Button>
    </form>
  )
}

const ConnectedBlogForm = connect(null, { createBlog, setNotification })(BlogForm)
export default ConnectedBlogForm