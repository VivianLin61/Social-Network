import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton.js'
// import DeleteButton from './DeleteButton.js'
// import MyPopup from '../util/MyPopup'
import { Row, Col, Dropdown } from 'react-bootstrap'
import { BiCommentDots } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { TiEdit } from 'react-icons/ti'
import { BiTrash } from 'react-icons/bi'
import DeleteModal from '../components/Modals/DeleteModal.js'
function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function handleEdit() {
    console.log('edit')
  }

  function handleDelete() {
    console.log('delete')
    setShowDeleteModal(true)
    setOpen(false)
  }
  function DropdownMenu() {
    console.log('open')
    function DropdownItem(props) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <button href='#' onClick={props.handleDropdown} className='menu-item'>
          {props.children}
        </button>
      )
    }

    return (
      <div className='dropdown'>
        <div className='square'></div>
        <DropdownItem handleDropdown={handleEdit}>
          <TiEdit />
          <span>Edit</span>
        </DropdownItem>
        <DropdownItem handleDropdown={handleDelete}>
          <BiTrash />
          <span>Delete</span>
        </DropdownItem>
      </div>
    )
  }
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
              {open && <DropdownMenu />}
              <Col xs={12}>
                <Row>
                  <div>
                    <span>{username}</span>
                    <span>{moment(createdAt).fromNow(true) + ' ago'}</span>
                    {user && user.username === username ? (
                      <BsThreeDots onClick={() => setOpen(!open)}></BsThreeDots>
                    ) : null}
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
              </Col>
            </Row>
          </Col>
        </Row>
        <DeleteModal
          post_id={id}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        />
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
