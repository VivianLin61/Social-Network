import React, { useState } from 'react'
import DropDownMenu from '../components/DropDownMenu.js'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import DeleteModal from '../components/Modals/DeleteModal.js'
import { BsThreeDots } from 'react-icons/bs'

function CommentCard(props) {
  const { comment, user, postId } = props
  const [open, setOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      {' '}
      <Row>
        <Col xs={1}>
          <img
            size='small'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            float='right'
            alt='none'
          />
        </Col>
        <Col xs={11}>
          <Row className='commentBody'>
            {open && (
              <DropDownMenu
                setShowDeleteModal={setShowDeleteModal}
                setOpen={setOpen}
              />
            )}
            <Col xs={12}>
              <span>{comment.username}</span>
              <span>{moment(comment.createdAt).fromNow(true) + ' ago'}</span>
              {user && user.username === comment.username ? (
                <BsThreeDots
                  className='editModal'
                  onClick={() => setOpen(!open)}
                />
              ) : null}
            </Col>
            <Col xs={12}>
              <div>{comment.body}</div>
            </Col>
          </Row>
        </Col>
      </Row>{' '}
      <DeleteModal
        post_id={postId}
        comment_id={comment.id}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
    </>
  )
}

export default CommentCard
