import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth.js'
import { useForm } from '../util/hooks'
import { Form, Button } from 'react-bootstrap'

function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    email: '',
  })
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      // console.log(result.data.login)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <Form onSubmit={onSubmit}>
          <h1>Login</h1>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={values.email}
              error={errors.email ? true : undefined}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              error={errors.password ? true : undefined}
              onChange={onChange}
            />
          </Form.Group>
          <Button className='formSubmit' variant='primary' type='submit'>
            Login
          </Button>
        </Form>

        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`
