import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const result = await axios.post(baseUrl, newBlog, config)
  return result.data
}

const update = async (id, newBlog) => {
  const result = await axios.put(`${baseUrl}/${id}`, newBlog)
  return result.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = await axios.delete(`${baseUrl}/${id}`, config)
  return result.data
}

export default { getAll, create, update, deleteBlog, setToken }