import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"
import CssBaseline from "@material-ui/core/CssBaseline"

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("root")
)



