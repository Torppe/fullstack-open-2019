import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { likeBlog, deleteBlog, createComment } from "../reducers/blogReducer"
import { connect } from "react-redux"
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Input,
  Typography
} from "@material-ui/core"
// import List from "@material-ui/core/List"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemText from "@material-ui/core/ListItemText"
// import Input from "@material-ui/core/Input"
// import Typography from "@material-ui/core/Typography"

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

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <Typography variant="h4" component="h2" gutterBottom>
        {blog.title} {blog.author}
      </Typography>
      <div>
        <div>
          <Typography>
            {blog.likes} likes
            <Button
              style={{ margin: "1em" }}
              color="primary"
              size="small"
              variant="contained"
              onClick={() => handleLike(blog)}>
              like
            </Button>
          </Typography>
        </div>
      </div>
      <div>Added by {blog.user ? blog.user.name : ""}</div>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <Button
        style={{ margin: "1em 0 0 0" }}
        size="small"
        variant="outlined"
        color="secondary"
        onClick={() => handleDelete(blog)}>
        delete
      </Button>

      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <Input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="small">
            add comment
          </Button>
        </div>
      </form>
      <List dense={true}>
        {blog.comments.map((c, index) =>
          <ListItem key={index}>
            <ListItemText primary={c} />
          </ListItem>
        )}
      </List>
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