import React, { useState } from "react"
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  if(showDetails) {
    return(
      <div style={blogStyle} onClick={() => setShowDetails(!showDetails)}>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={() => handleDelete(blog)}>delete</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} onClick={() => setShowDetails(!showDetails)}>
        <div>{blog.title} {blog.author}</div>
      </div>
    )
  }
}

export default Blog