import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export default { getAll }