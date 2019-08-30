const notificationReducer = (state = "", action) => {
  switch(action.type){
    case "SET_NOTIFICATION" :
      return action.data
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    const timeInMs = time * 1000
    dispatch({
      type: "SET_NOTIFICATION",
      data: message
    })

    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: ""
      })
    }, timeInMs)
  }
}



export default notificationReducer