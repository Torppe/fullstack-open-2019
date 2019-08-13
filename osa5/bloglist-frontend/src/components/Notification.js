import React from "react"

const Notification = (props) => {
  const style = {
    color: 'black',
    border: "1px solid black",
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(!props.notification){
    return null
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

export default Notification