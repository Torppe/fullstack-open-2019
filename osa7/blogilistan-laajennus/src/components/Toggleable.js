import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable