import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import 'bootstrap/dist/css/bootstrap.min.css'
import Profile from './pages/Profile/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    console.log(auth.user)
    if (auth.user == null) {
      dispatch(isUserLoggedIn())
    }
  })
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile/:userId' component={Profile} />
        <Route exact path='/posts/:postId' component={SinglePost} />
      </Container>
    </Router>
  )
}

export default App
