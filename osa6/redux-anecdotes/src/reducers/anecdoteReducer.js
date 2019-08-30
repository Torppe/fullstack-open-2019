import anecdoteService from  "../services/anecdotes"

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const addVote = (id, anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await anecdoteService.update(id, newAnecdote)
    console.log(response)
    dispatch({
      type: "VOTE",
      data: response
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case "VOTE" :
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case "NEW_ANECDOTE" :
      return [...state, action.data]
    case "INIT_ANECDOTES" :
      return action.data
    default: return state
  }
}

export default anecdoteReducer