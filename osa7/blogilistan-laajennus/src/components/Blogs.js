import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const Blogs = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      {sortBlogs(props.blogs).map(blog =>
        <div key={blog.id} className="clickableContent blog" style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogs = connect(mapStateToProps)(Blogs)
export default ConnectedBlogs