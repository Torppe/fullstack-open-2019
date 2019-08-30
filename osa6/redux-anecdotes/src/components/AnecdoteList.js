import React from 'react'
import { connect } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const vote = (id) => {
    const votedAnecdote = props.anecdotes.find(a => a.id === id)
    props.addVote(id, votedAnecdote)
    props.setNotification(`you voted "${votedAnecdote.content}"`, 10)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => {
  const regex = new RegExp(filter, "i")
  return anecdotes.filter(a => a.content.match(regex))
}

const sortedAnecdotes = (anecdotes) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  return sortedAnecdotes
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: sortedAnecdotes(filteredAnecdotes(state))
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList

