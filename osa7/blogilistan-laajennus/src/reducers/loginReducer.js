import blogService from "../services/blogs"
import loginService from "../services/login"

const LOCAL_STORAGE_USER = "loggedInUser"

const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_USER)
  let user = null
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
  }
  return user
}

export const login = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
    dispatch({
      type: "SET_USER",
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem(LOCAL_STORAGE_USER)
    dispatch({
      type: "SET_USER",
      data: null
    })
  }
}

const loginReducer = (state = initUser(), action) => {
  switch (action.type) {
  case "SET_USER":
    blogService.setToken(action.data ? action.data.token : null)
    return action.data
  default: return state
  }
}

export default loginReducer