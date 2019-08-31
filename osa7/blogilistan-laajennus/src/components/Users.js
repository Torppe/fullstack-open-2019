import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import userService from "../services/users"

const Users = ({ users, setUsers }) => {
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getAll()
      setUsers(result)
    }
    fetchUsers()
  }, [setUsers])

  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users