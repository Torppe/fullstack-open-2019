import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { logout } from "../reducers/loginReducer"

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const handleLogout = async () => {
    await props.logout()
    props.history.push("/")
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {props.user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const ConnectedMenu = connect(mapStateToProps,{ logout })(Menu)
export default withRouter(ConnectedMenu)