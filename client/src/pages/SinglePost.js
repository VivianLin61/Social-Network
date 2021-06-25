import React, { useContext, useState, useRef } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { BsThreeDots } from 'react-icons/bs'
import { Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap'
import { AuthContext } from '../context/auth'

function SinglePost(props) {
  const postId = props.match.params.postId
  const [comment, setComment] = useState('')

  const commentInputRef = useRef(null)
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('')

      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment,
    },
  })

  const { user } = useContext(AuthContext)

  const { data, error } = useQuery(FETCH_POST_QUERY, {
    onError(error) {
      console.log(error)
    },
    variables: { postId: postId },
  })

  if (error) {
    console.log(error)
    return 'error'
  }

  let postMarkup
  if (!data) {
    postMarkup = <p>Loading post...</p>
  } else {
    const { body, createdAt, username, comments } = data.getPost

    postMarkup = (
      <>
        <div className='singlePostContainer'>
          <Row>
            <Col xs={2}>
              <img
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                alt=''
              />
            </Col>
            <Col xs={10}>
              <Row xs={2} className='justify-content-md-center postBody'>
                <Col xs={12}>
                  <Row>
                    <div>
                      <span>{username}</span>
                      <span>{moment(createdAt).fromNow(true) + ' ago'}</span>
                    </div>
                  </Row>
                </Col>
                <Col style={{ height: '70px' }} xs={12}>
                  {body}
                </Col>
                <Col className='align-text-bottom' xs={12}></Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Row xs={2} className='justify-content-md-center createPostBody'>
                <Col className='h-20' xs={12}>
                  <div>{`${comments.length} comments`}</div>

                  <hr />
                </Col>
                {user ? (
                  <Col className='h-80' xs={12}>
                    <Row>
                      <Col xs={10}>
                        <InputGroup className='mb-3 createPostForm'>
                          <FormControl
                            placeholder={`What's on your mind, ${user.username}?`}
                            aria-label='createPostForm'
                            aria-describedby='basic-addon1'
                            onChange={(event) => setComment(event.target.value)}
                            value={comment}
                            ref={commentInputRef}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={2}>
                        <div className='submitComment'>
                          <Button onClick={submitComment}>Submit</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                ) : null}{' '}
              </Row>
            </Col>
            {comments.map((comment, index) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <div className='commentContainer' key={index}>
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
                      <Col xs={12}>
                        <span>{comment.username}</span>

                        <span>
                          {moment(comment.createdAt).fromNow(true) + ' ago'}
                        </span>
                        {user && user.username === comment.username ? (
                          <BsThreeDots onClick={updateComment} />
                        ) : null}
                      </Col>
                      <Col xs={12}>
                        <div>{comment.body}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
          </Row>
        </div>
      </>
    )
  }
  function updateComment() {}
  function deletePostCallback() {
    props.history.push('/')
  }

  return <>{postMarkup}</>
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export default SinglePost
