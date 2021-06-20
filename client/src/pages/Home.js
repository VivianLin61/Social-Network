import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql'
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import PostCard from '../components/PostCard'
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import CreatePostModal from '../components/Modals/CreatePostModal.js'
function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)
  //If user show post form where user can post something
  //Loads all the posts.
  const [modalShow, setModalShow] = React.useState(false)
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
                        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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
        <h1>Loading posts..</h1>
      ) : (
        <div className='postsList'>
          <>
            {posts &&
              posts.map((post, index) => <PostCard key={index} post={post} />)}
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
