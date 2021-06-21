import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
const UpdateInfoModal = (props) => {
  const [body, setBody] = useState(null)
  function ChangeUsernameBody() {
    return (
      <>
        <Form.Label>Current Username</Form.Label>
        <Form.Control
          type='text'
          placeholder={props.user.username}
          readOnly
          className='disabledInput'
        />
        <Form.Control type='text' placeholder='New Username' />
      </>
    )
  }
  function ChangeEmailBody() {
    return (
      <>
        <Form.Label>Current Email</Form.Label>
        <Form.Control
          type='text'
          placeholder={props.user.email}
          readOnly
          className='disabledInput'
        />
        <Form.Control type='text' placeholder='New Email' />
      </>
    )
  }
  function ChangePasswordBody() {
    return (
      <>
        <Form.Label>Current Password</Form.Label>
        <Form.Control type='text' placeholder='Current Password' />
        <Form.Control type='text' placeholder='New password' />
        <Form.Control type='text' placeholder='Confirm new password' />
      </>
    )
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
          {`Change ${props.updateType}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.updateType === 'Email' && <ChangeEmailBody />}
        {props.updateType === 'Username' && <ChangeUsernameBody />}
        {props.updateType === 'Password' && <ChangePasswordBody />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateInfoModal
