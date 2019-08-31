import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import loginReducer from "./reducers/loginReducer"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"

const reducer = combineReducers({
  user: loginReducer,
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store