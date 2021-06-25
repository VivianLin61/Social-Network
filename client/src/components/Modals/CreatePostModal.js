import React, { useRef, } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { GrFormClose } from 'react-icons/gr'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../../util/hooks'
import { FETCH_POSTS_QUERY } from '../../util/graphql'

function CreatePostModal(props) {
  const textArea = useRef()
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      })

      values.body = ''
    },
  })
//character count 250 or less
  const handlePost = (e) => {
    props.onHide()
    onSubmit(e)
    createPost()
  }
  function createPostCallback() {}
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='createPostModal'
      onEntered={() => textArea.current.focus()}
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
            onChange={onChange}
            name={'body'}
            value={values.body}
            as='textarea'
            rows={3}
            ref={textArea}
            error={error ? true : false}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {values.body !== '' ? (
          <Button className='postButton' onClick={handlePost}>
            Post
          </Button>
        ) : (
          <Button
            className='postButton'
            onClick={handlePost}
            style={{ backgroundColor: 'gray', pointerEvents: 'none' }}
          >
            Post
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`
export default CreatePostModal
