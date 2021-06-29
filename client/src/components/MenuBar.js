import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { logout } from '../actions'
import { IoNotifications } from 'react-icons/io5'
import { GET_NOTIFICATIONS_QUERY } from '../util/graphql.js'
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment'
function MenuBar() {
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(!show)

  let notifications = null
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.user)
  const { data } = useQuery(GET_NOTIFICATIONS_QUERY, {
    variables: { userId: user ? user.id : '' },
  })
  useEffect(() => {
    let modalContainer = document.querySelectorAll('.notificationModal')[0]

    if (modalContainer && show) {
      let modalContainer = document.querySelectorAll('.notificationModal')[0]
      modalContainer.classList.add('display')
    } else if (modalContainer && !show) {
      modalContainer.classList.remove('display')
    }
  }, [show])
  if (data) {
    notifications = data.getNotifications
  }
  useEffect(() => {
    if (auth) {
      setUser(auth)
    } else {
      setUser(null)
    }
  }, [auth])
  const showNotifications = () => {
    handleShow()
    console.log(notifications)
  }
  const menuBar =
    user != null ? (
      <>
        <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
          <Nav.Item as='li'>
            <Nav.Link href='/'>Social</Nav.Link>
          </Nav.Item>

          <div className='rightMenu'>
            <Nav.Item>
              <div className='notificationIcon'>
                <button onClick={showNotifications}>
                  <IoNotifications />
                </button>

                {notifications && notifications.length > 0 && (
                  <span className='notificationCount'>
                    {notifications.length}
                  </span>
                )}
              </div>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link href={`/profile/${user.id}`}>{user.username}</Nav.Link>
            </Nav.Item>
            <Nav.Item
              as='li'
              onClick={() => {
                dispatch(logout())
              }}
            >
              <Link className='nav-link' to={`/login`}>
                Logout
              </Link>
            </Nav.Item>
          </div>
          <div className='notificationModal'>
            <h1>Notifications</h1>
            {notifications &&
              notifications.map((notification, index) => (
                <Link
                  to={`/posts/${notification.postId}`}
                  key={index}
                  className='notificationCard'
                >
                  <div style={{ padding: '5px' }}>
                    <div>{notification.message}</div>
                    <span>
                      {moment(notification.createdAt).fromNow(true) + ' ago'}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </Nav>
      </>
    ) : (
      //login register
      <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
        <Nav.Item as='li'>
          <Nav.Link href='/'>Social</Nav.Link>
        </Nav.Item>
        <div className='rightMenu'>
          <Nav.Item name='login' as='li'>
            <Nav.Link href={`/login`}>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li' name='register'>
            <Nav.Link href='/register'>Register</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    )

  return menuBar
}

export default MenuBar
