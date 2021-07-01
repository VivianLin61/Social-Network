import React, { useState, useRef, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap'
import CommentCard from '../components/CommentCard.js'
import { useSelector } from 'react-redux'
import { CREATE_NOTIFICATION, GET_USER } from '../util/graphql.js'
function SinglePost(props) {
  const postId = props.match.params.postId
  const auth = useSelector((state) => state.auth.user)
  const [user, setUser] = useState(null)
  const [comment, setComment] = useState('')
  const commentInputRef = useRef(null)
  let postInfo = null
  let postUser = null
  useEffect(() => {
    if (auth) {
      setUser(auth)
    } else {
      setUser(null)
    }
  }, [auth])

  const { data, error } = useQuery(FETCH_POST_QUERY, {
    onError(error) {
      console.log(error)
    },
    variables: { postId: postId },
  })

  if (error) {
    console.log(error)
  }

  if (data) {
    postInfo = data.getPost
  }
  const { data: postUserData } = useQuery(GET_USER, {
    variables: {
      userId: postInfo ? postInfo.userId : '',
    },
  })

  if (postUserData) {
    postUser = postUserData.getUser
  }

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('')
      if (postInfo.userId !== user.id) {
        createCommentNotification()
      }
      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment,
      commenterId: user ? user.id : '', //the user who is commenting
    },
  })
  const [createCommentNotification] = useMutation(CREATE_NOTIFICATION, {
    variables: {
      message: user ? `${user.username} commented on your post` : '',
      postId: postId,
      userId: postInfo ? postInfo.userId : '', //the user that posted the post.
    },
    onError(err) {
      console.log(err)
    },
  })

  return (
    <>
      {postInfo ? (
        <>
          <div className='singlePostContainer'>
            <Row>
              <Col xs={2}>
                <img src={postUser ? postUser.profileImage : ''} alt='' />
              </Col>
              <Col xs={10}>
                <Row xs={2} className='justify-content-md-center postBody'>
                  <Col xs={12}>
                    <Row>
                      <div>
                        <span>{postInfo.username}</span>
                        <span>
                          {moment(postInfo.createdAt).fromNow(true) + ' ago'}
                        </span>
                      </div>
                    </Row>
                  </Col>
                  <Col style={{ height: '70px' }} xs={12}>
                    {postInfo.body}
                  </Col>
                  <Col className='align-text-bottom' xs={12}></Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row
                  xs={2}
                  className='justify-content-md-center createPostBody'
                >
                  <Col className='h-20' xs={12}>
                    <div>{`${postInfo.comments.length} comments`}</div>

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
                              onChange={(event) =>
                                setComment(event.target.value)
                              }
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
              {postInfo.comments.map((comment, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <div className='commentContainer' key={index}>
                  <CommentCard user={user} comment={comment} postId={postId} />
                </div>
              ))}
            </Row>
          </div>
        </>
      ) : (
        <div className='loader'>Loading...</div>
      )}
    </>
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!, $commenterId: String!) {
    createComment(postId: $postId, body: $body, commenterId: $commenterId) {
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
      userId
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
        image
      }
    }
  }
`

export default SinglePost
