import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'
const initialState = {
  user: null,
}

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  updateUser: (userData) => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  function logout() {
    localStorage.removeItem('jwtToken')

    dispatch({ type: 'LOGOUT' })
  }

  function updateUser(userData) {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    })
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, updateUser }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
