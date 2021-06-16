import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { GrFormClose } from 'react-icons/gr'
function CreatePostModal(props) {
  const handlePost = (e) => {
    props.onHide()
  }
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='createPostModal'
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h1>Create Post</h1>
        </Modal.Title>
        <button onClick={props.onHide} className='closeCreateFormModal'>
          <GrFormClose />
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            className='createPostFormModal'
            placeholder={`What's on your mind, ${props.username}?`}
            as='textarea'
            rows={3}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className='postButton' onClick={props.onHide}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreatePostModal
