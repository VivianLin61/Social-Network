import React from 'react'
import { Modal } from 'react-bootstrap'
function PopupModal(props) {
  return (
    <>
      <Modal
        className='popUp-modal'
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  )
}

export default PopupModal
