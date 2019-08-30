import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    props.createAnecdote(content)
    props.setNotification(`you added "${content}"`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name="content" /></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm