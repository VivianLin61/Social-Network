import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
