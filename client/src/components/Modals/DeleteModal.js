import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../../util/graphql.js'
import { Modal, Button } from 'react-bootstrap'
import PopupModal from '../PopupModal.js'

function DeleteModal(props) {
  const mutation = props.comment_id
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION
  const title = props.comment_id
    ? 'Delete Comment'
    : props.post_id
    ? 'Delete Post'
    : 'Delete Notification'
  const [popup, setPopup] = useState(false)
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      props.onHide()
      if (props.post_id) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== props.post_id),
          },
        })

        if (props.callback) {
          props.callback()
        }
      }
    },
    variables: {
      postId: props.post_id,
      commentId: props.comment_id,
    },
  })

  function onDelete() {
    setPopup(true)
    deletePostOrMutation()
  }

  function handleClosePopup() {
    setPopup(false)
  }
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='deleteModal'
    >
      <Modal.Body className='deletePostBody'>
        <h4>{title}</h4>
        <p>This cannot be undone and will be removed from your profile.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Modal.Footer>
      <PopupModal
        title='Deleting...'
        show={popup}
        handleClosePopup={handleClosePopup}
      ></PopupModal>
    </Modal>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteModal
