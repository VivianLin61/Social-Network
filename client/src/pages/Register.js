import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { login } from '../actions'
import { useForm } from '../util/hooks'
import { useDispatch } from 'react-redux'

function Register(props) {
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      dispatch(login(userData))

      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function registerUser() {
    addUser()
  }

  return (
    <>
      {' '}
      {!loading ? (
        <div style={{ marginTop: '10px' }} className='form-container'>
          <Form onSubmit={onSubmit}>
            <h1>Regsiter</h1>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='username'
                name='username'
                placeholder='Enter Username'
                value={values.username}
                error={errors.username ? true : undefined}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter Email'
                value={values.email}
                error={errors.email ? true : undefined}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
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
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={values.confirmPassword}
                error={errors.confirmPassword ? true : undefined}
                onChange={onChange}
              />
            </Form.Group>
            <Button className='formSubmit' variant='primary' type='submit'>
              Register
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
      ) : (
        <div className='loader'>Loading...</div>
      )}
    </>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      profileImage
      token
    }
  }
`

export default Register
