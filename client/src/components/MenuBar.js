import React, { useState, useEffect, useRef } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { logout } from '../actions'
import { IoNotifications } from 'react-icons/io5'
import {
  GET_NOTIFICATIONS_QUERY,
  UPDATE_NOTIFICATION,
} from '../util/graphql.js'

import NotificationCard from './NotificationCard.js'
function MenuBar() {
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)
  const [menu, showMenu] = useState(false)
  const node = useRef()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let notificationsLength = 0
  let notifications = null
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.user)
  const { data, refetch } = useQuery(GET_NOTIFICATIONS_QUERY, {
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
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
  useEffect(() => {
    if (notificationsLength === 0) {
      showMenu(false)
    }
  }, [notificationsLength])
  const handleClick = (e) => {
    if (node.current) {
      if (node.current.contains(e.target)) {
        // inside click
        return
      }
    }
    // outside click
    handleClose()
  }

  if (data) {
    notifications = data.getNotifications
    let unRead = data.getNotifications.filter(
      (notification) => notification.read === false
    )
    notificationsLength = unRead.length
  }
  const notificationMenu = (e) => {
    handleShow()
    showMenu(true)
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
  }
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION, {
    onCompleted: () => {
      refetch()
    },
  })

  const deactivateNotification = (id) => {
    updateNotification({ variables: { id: id } })
    handleClose()
  }
  const menuBar =
    user != null ? (
      <>
        <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
          <Nav.Item as='li'>
            <Nav.Link href='/'>Social Network</Nav.Link>
          </Nav.Item>

          <div className='rightMenu'>
            <Nav.Item>
              <div className='notificationIcon'>
                <button onClick={showNotifications}>
                  <IoNotifications />
                </button>

                {notifications && notificationsLength > 0 && (
                  <span className='notificationCount'>
                    {notificationsLength}
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
          <div ref={node} className='notificationModal'>
            <h1>Notifications</h1>
            {notifications &&
              notifications.map((notification, index) => (
                <NotificationCard
                  key={index}
                  deactivateNotification={deactivateNotification}
                  notificationMenu={notificationMenu}
                  menu={menu}
                  notification={notification}
                  userId={user ? user.id : ''}
                />
              ))}
          </div>
        </Nav>
      </>
    ) : (
      //login register
      <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
        <Nav.Item as='li'>
          <Nav.Link href='/'>Social Network</Nav.Link>
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
