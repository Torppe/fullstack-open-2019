const notificationReducer = (state = "", action) => {
  switch (action.type) {
  case "SET_NOTIFICATION" :
    return action.data
  default: return state
  }
}

let currentTimeout

export const setNotification = (message) => {
  return async dispatch => {

    dispatch({
      type: "SET_NOTIFICATION",
      data: message
    })

    if(currentTimeout) {
      clearTimeout(currentTimeout)
    }

    currentTimeout = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: ""
      })
    }, 5000)
  }
}

export default notificationReducer