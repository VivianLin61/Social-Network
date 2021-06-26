import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import PopUpModal from './PopupModal.js'

const UpdateInfoModal = (props) => {
  let error
  const [empty, setEmpty] = useState({
    email: false,
    username: false,
    confirmPassword: false,
    password: false,
    currentPassword: false,
  })

  function onClickSubmit() {
    if (
      props.type === 'Email' &&
      document.getElementsByName('email')[0].value === ''
    ) {
      setEmpty((prevEmpty) => ({
        ...prevEmpty,
        email: true,
      }))
      error = true
    }
    if (
      props.type === 'Username' &&
      document.getElementsByName('username')[0].value === ''
    ) {
      setEmpty((prevEmpty) => ({
        ...prevEmpty,
        username: true,
      }))
      error = true
    }
    if (
      props.type === 'Password' &&
      document.getElementsByName('confirmPassword')[0].value === ''
    ) {
      setEmpty((prevEmpty) => ({
        ...prevEmpty,
        confirmPassword: true,
      }))
      error = true
    }
    if (
      props.type === 'Password' &&
      document.getElementsByName('currentPassword')[0].value === ''
    ) {
      setEmpty((prevEmpty) => ({
        ...prevEmpty,
        currentPassword: true,
      }))
      error = true
    }
    if (
      props.type === 'Password' &&
      document.getElementsByName('password')[0].value === ''
    ) {
      setEmpty((prevEmpty) => ({
        ...prevEmpty,
        password: true,
      }))
      error = true
    }
    if (!error) {
      props.setShow(true)
    }
  }

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
          {`Change ${props.type}`}
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
          {props.type === 'Username' && empty.username && (
            <div className='modalError'>Fields must not be empty</div>
          )}
          {props.type === 'Email' && empty.email && (
            <div className='modalError'>Email must not be empty</div>
          )}
          {props.type === 'Password' && empty.currentPassword && (
            <div className='modalError'>Current Password must not be empty</div>
          )}
          {props.type === 'Password' && empty.password && (
            <div className='modalError'>Password must not be empty</div>
          )}
          {props.type === 'Password' && empty.confirmPassword && (
            <div className='modalError'>Confirm Password must not be empty</div>
          )}
          <div className='footer'>
            <Button
              className={props.showPopup && 'disableButton'}
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button onClick={onClickSubmit} variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>{' '}
      <PopUpModal show={props.popup} handleClose={props.handleClosePopup} />
    </Modal>
  )
}

export default UpdateInfoModal
