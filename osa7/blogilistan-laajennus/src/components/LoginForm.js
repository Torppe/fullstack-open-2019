import React from "react"
import { connect } from "react-redux"
import { useField } from "../hooks"
import { login } from "../reducers/loginReducer"
import { setNotification } from "../reducers/notificationReducer"
import { Paper, Button, TextField } from "@material-ui/core"

const LoginForm = ({ setNotification, login }) => {
  const username = useField("text")
  const password = useField("password")

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in user", username.value)

    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      await login(credentials)
      console.log("login succesful!")
    } catch (exception) {
      setNotification("wrong username or password")
    }
  }

  return (
    <div>
      <Paper style={{
        padding: "2em",
        display: "flex",
        justifyContent: "center",
        margin: "1em"
      }}>
        <form onSubmit={handleLogin}>
          <h2>Log in to application</h2>
          <div>
            <TextField
              placeholder="Username"
              variant="outlined"
              margin="dense"
              {...username}
            />
          </div>
          <div>
            <TextField
              placeholder="Password"
              variant="outlined"
              margin="dense"
              {...password}
            />
          </div>
          <div>
            <Button
              color="primary"
              variant="contained"
              type="submit">
                login
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

const ConnectedLoginForm = connect(null, { login, setNotification })(LoginForm)
export default ConnectedLoginForm