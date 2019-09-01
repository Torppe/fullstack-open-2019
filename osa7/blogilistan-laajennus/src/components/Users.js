import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import userService from "../services/users"
import { Typography } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"

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
      <Typography variant="h4" component="h2" gutterBottom>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users