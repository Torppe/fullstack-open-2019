import React from "react"
import { connect } from "react-redux"
import { useField } from "../hooks"
import { login } from "../reducers/loginReducer"
import { setNotification } from "../reducers/notificationReducer"

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
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input
            {...username}
          />
        </div>
        <div>password
          <input
            {...password}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const ConnectedLoginForm = connect(null, { login, setNotification })(LoginForm)
export default ConnectedLoginForm