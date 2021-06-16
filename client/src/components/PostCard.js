import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton.js'
// import DeleteButton from './DeleteButton.js'
// import MyPopup from '../util/MyPopup'
import { Row, Col } from 'react-bootstrap'
import { BiCommentDots } from 'react-icons/bi'
import { FcLikePlaceholder } from 'react-icons/fc'
function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext)

  return (
    <>
      <div className='postCardContainer'>
        <Row>
          <Col xs={2}>
            <img
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
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
              <Col className='align-text-bottom' xs={12}>
                <Link to={`/posts/${id}`}>
                  <BiCommentDots style={{ fontSize: '22px' }} />
                </Link>
                <span className='commentAndLikeCount'>{commentCount}</span>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                {/* <FcLikePlaceholder
                  style={{ paddingTop: '2px', fontSize: '20px' }}
                />

                <span className='commentAndLikeCount'>{likeCount}</span> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
    // <Card fluid>
    //   <Card.Content>
    //     <Image
    //       floated='right'
    //       size='mini'
    //       src='https://react.semantic-ui.com/images/avatar/large/molly.png'
    //     />
    //     <Card.Header>{username}</Card.Header>
    //     <Card.Meta as={Link} to={`/posts/${id}`}>
    //       {moment(createdAt).fromNow(true)}
    //     </Card.Meta>
    //     <Card.Description>{body}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button as='div' labelPosition='right'>
    //       <LikeButton user={user} post={{ id, likes, likeCount }} />
    //     </Button>
    //     <MyPopup content='Comment on post'>
    //       <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
    //         <Button color='blue' basic>
    //           <Icon name='comments' />
    //         </Button>
    //         <Label basic color='blue' pointing='left'>
    //           {commentCount}
    //         </Label>
    //       </Button>
    //     </MyPopup>
    //     {user && user.username === username && <DeleteButton postId={id} />}
    //   </Card.Content>
    // </Card>
  )
}

export default PostCard
