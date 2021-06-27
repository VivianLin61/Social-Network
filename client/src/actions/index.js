export const login = (userData) => {
  return async (dispatch) => {
    localStorage.setItem('jwtToken', userData.token)
    localStorage.setItem('user', JSON.stringify(userData))
    dispatch({
      type: 'LOGIN',
      payload: {
        email: userData.email,
        id: userData.id,
        profileImage: userData.profileImage,
        token: userData.token,
        username: userData.username,
      },
    })
  }
}

export const logout = () => {
  localStorage.clear()
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const updateUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData))
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        email: userData.email,
        id: userData.id,
        profileImage: userData.profileImage,
        token: userData.token,
        username: userData.username,
      },
    })
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: 'LOGIN',
        payload: user,
      })
    }
  }
}
