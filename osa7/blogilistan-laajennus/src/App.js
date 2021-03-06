import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import Notification from "./components/Notification"
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import Menu from "./components/Menu"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import LoginForm from "./components/LoginForm"
import Toggleable from "./components/Toggleable"
import BlogForm from "./components/BlogForm"
import { initializeBlogs } from "./reducers/blogReducer"
import { connect } from "react-redux"
import { Typography } from "@material-ui/core";

const App = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const userById = id => {
    return users.find(u => u.id === id)
  }
  if (!props.user) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <Menu />
        <Notification />
        <Route exact path="/" render={() =>
          <div>
            <Typography variant="h4" component="h2" gutterBottom>
              Blogs
            </Typography>
            <Toggleable buttonLabel="new blog">
              <BlogForm />
            </Toggleable>
            <Blogs />
          </div>
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog id={match.params.id} />
        } />
        <Route exact path="/users" render={() =>
          <Users users={users} setUsers={setUsers} />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeBlogs })(App)
