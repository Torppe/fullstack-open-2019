import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { logout } from "../reducers/loginReducer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

const Menu = (props) => {
  const handleLogout = async () => {
    await props.logout()
    props.history.push("/")
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 1 }}>
            <Button to="/" color="inherit" component={Link}>blogs</Button>
            <Button to="/users"  color="inherit" component={Link}>users</Button>
            {props.user.name} logged in
          </div>
          <Button onClick={handleLogout} color="inherit">logout</Button>
        </Toolbar>
      </AppBar>
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