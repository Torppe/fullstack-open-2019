import blogService from "../services/blogs"

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "NEW_BLOG",
      data: newBlog
    })
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    const newBlog = await blogService.createComment(blog.id, { comment })
    dispatch({
      type: "NEW_COMMENT",
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const response = await blogService.update(newBlog.id, newBlog)
    dispatch({
      type: "LIKE",
      data: response
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: "DELETE_BLOG",
      data: id
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "LIKE":
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case "NEW_BLOG":
    return [...state, action.data]
  case "NEW_COMMENT":
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case "DELETE_BLOG":
    return state.filter(b => b.id !== action.data)
  case "INIT_BLOGS":
    return action.data
  default: return state
  }
}

export default blogReducer