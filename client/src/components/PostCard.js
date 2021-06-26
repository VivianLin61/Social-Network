import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton.js'
import { Row, Col } from 'react-bootstrap'
import { BiCommentDots } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { TiEdit } from 'react-icons/ti'
import { BiTrash } from 'react-icons/bi'
import DeleteModal from '../components/Modals/DeleteModal.js'
import DropDownMenu from '../components/DropDownMenu.js'
function PostCard({ post }) {
  const { body, createdAt, id, username, likeCount, commentCount, likes } = post
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      <div className='postCardContainer'>
        <Row>
          <Col xs={2}>
            <img
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              alt=''
            />
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
  )
}

export default PostCard
