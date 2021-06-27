import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LikeButton from './LikeButton.js'
import { Row, Col } from 'react-bootstrap'
import { BiCommentDots } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import DeleteModal from '../components/Modals/DeleteModal.js'
import DropDownMenu from '../components/DropDownMenu.js'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '../util/graphql'
function PostCard({ post, userInfo }) {
  const {
    body,
    createdAt,
    id,
    username,
    userId,
    likeCount,
    commentCount,
    likes,
  } = post
  let postUser = {}

  const [open, setOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data } = useQuery(GET_USER, {
    variables: { userId: userId },
  })

  if (data) {
    postUser = data.getUser
  }

  return (
    <>
      <div className='postCardContainer'>
        <Row>
          <Col xs={2}>
            <img src={postUser.profileImage} alt='' />
          </Col>
          <Col xs={10}>
            <Row xs={2} className='justify-content-md-center postBody'>
              {open && (
                <DropDownMenu
                  setShowDeleteModal={setShowDeleteModal}
                  setOpen={setOpen}
                />
              )}
              <Col xs={12}>
                <Row>
                  <div>
                    <span>{[postUser.username]}</span>
                    <span>{moment(createdAt).fromNow(true) + ' ago'}</span>
                    {userInfo && userInfo.username === username ? (
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
                <LikeButton user={userInfo} post={{ id, likes, likeCount }} />
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
  )
}
export default PostCard
