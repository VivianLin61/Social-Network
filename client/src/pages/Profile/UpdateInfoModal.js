import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
const UpdateInfoModal = (props) => {
  const [body, setBody] = useState(null)

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='updateInfoModal'
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          {`Change ${props.updateType}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.onSubmit}>
          {props.type === 'Email' && (
            <>
              <Form.Label>Current Email</Form.Label>
              <Form.Control
                type='text'
                placeholder={props.user.email}
                readOnly
                className='disabledInput'
              />
              <Form.Control
                type='text'
                name='email'
                onChange={props.onChange}
                placeholder='New Email'
              />
            </>
          )}
          {props.type === 'Username' && (
            <>
              <Form.Label>Current Username</Form.Label>
              <Form.Control
                type='text'
                placeholder={props.user.username}
                readOnly
                className='disabledInput'
              />
              <Form.Control
                type='username'
                placeholder='New Username'
                onChange={props.onChange}
                name='username'
              />
            </>
          )}
          {props.type === 'Password' && (
            <>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type='password'
                name='currentPassword'
                placeholder='Current Password'
              />
              <Form.Control
                type='password'
                name='password'
                onChange={props.onChange}
                placeholder='New password'
              />
              <Form.Control
                type='password'
                name='confirmPassword'
                onChange={props.onChange}
                placeholder='Confirm new password'
              />
            </>
          )}{' '}
          {props.errors.confirmPassword ? (
            <>
              {' '}
              <div className='modalError'>Passwords must match</div>
            </>
          ) : (
            <> </>
          )}
          {props.errors.general ? (
            <>
              <div className='modalError'>Current password is incorrect</div>
            </>
          ) : (
            <> </>
          )}
          <div className='footer'>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UpdateInfoModal