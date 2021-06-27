// eslint-disable-next-line import/no-anonymous-default-export

const initialState = {
  user: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
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
