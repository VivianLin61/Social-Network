import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import PostCard from '../components/PostCard'
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import CreatePostModal from '../components/Modals/CreatePostModal.js'
import { useSelector } from 'react-redux'
function Home() {
  const [user, setUser] = useState(null)
  const auth = useSelector((state) => state.auth.user)

  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    if (auth) {
      setUser(auth)
    } else {
      setUser(null)
    }
  }, [auth])

  return (
    <>
      {user && (
        <div className='postsList'>
          <div className='postCardContainer'>
            <Col xs={12}>
              <Row xs={2} className='justify-content-md-center createPostBody'>
                <Col className='h-20' xs={12}>
                  <div>Post Something</div>
                  <hr />
                </Col>
                <Col className='h-80' xs={12}>
                  <Row>
                    <Col xs={1}>
                      <img
                        style={{
                          marginLeft: '5px',
                          marginTop: '0px',
                          width: '50px',
                        }}
                        src={user.profileImage}
                        alt=''
                      />
                    </Col>
                    <Col xs={11}>
                      <InputGroup className='mb-3 createPostForm'>
                        <FormControl
                          placeholder={`What's on your mind, ${user.username}?`}
                          aria-label='createPostForm'
                          aria-describedby='basic-addon1'
                          onClick={() => setModalShow(true)}
                          style={{ cursor: 'pointer' }}
                          readOnly
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </div>
        </div>
      )}
      {loading ? (
        <div className='loader'>Loading...</div>
      ) : (
        <div className='postsList'>
          <>
            {posts &&
              posts.map((post, index) => (
                <PostCard key={index} post={post} userInfo={user} />
              ))}
          </>
        </div>
      )}

      <CreatePostModal
        username={user ? user.username : undefined}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default Home
