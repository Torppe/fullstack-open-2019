import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"

const Blogs = (props) => {

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>title and author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortBlogs(props.blogs).map(blog =>
            <TableRow key={blog.id} className="clickableContent blog">
              <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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