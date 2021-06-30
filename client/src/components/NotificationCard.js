import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from './DropDownMenu.js'
import moment from 'moment'
import { BsThreeDots } from 'react-icons/bs'
import {
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS_QUERY,
  UPDATE_NOTIFICATION,
} from '../util/graphql.js'
import { useMutation } from '@apollo/react-hooks'
function NotificationCard(props) {
  const { notification, deactivateNotification } = props
  const [open, setOpen] = useState(false)
  const notificationMenu = () => {
    setOpen(!open)
  }
  const [deleteNotificationMutation] = useMutation(DELETE_NOTIFICATION, {
    update(proxy) {
      setOpen(false)
      const data = proxy.readQuery({
        query: GET_NOTIFICATIONS_QUERY,
        variables: { userId: props.userId },
      })
      proxy.writeQuery({
        query: GET_NOTIFICATIONS_QUERY,
        data: {
          getNotifications: data.getNotifications.filter(
            (n) => n.id !== props.notification.id
          ),
        },
        variables: { userId: props.userId },
      })
    },
    variables: {
      id: notification.id,
    },
  })

  const [updateNotificationMutation] = useMutation(UPDATE_NOTIFICATION, {
    update(proxy) {
      setOpen(false)
      const data = proxy.readQuery({
        query: GET_NOTIFICATIONS_QUERY,
        variables: { userId: props.userId },
      })
      proxy.writeQuery({
        query: GET_NOTIFICATIONS_QUERY,
        data: {
          getNotifications: data.getNotifications.map((n) =>
            n.id === props.notification.id ? (n.read = true) : (n.read = false)
          ),
        },
        variables: { userId: props.userId },
      })
    },
    variables: {
      id: notification.id,
    },
  })

  const updateNotification = () => {
    updateNotificationMutation()
  }

  return (
    <div className='notificationCard'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px',
        }}
      >
        <Link
          onClick={() => {
            deactivateNotification(notification.id)
          }}
          to={`/posts/${notification.postId}`}
        >
          <div>{notification.message}</div>
          <span>{moment(notification.createdAt).fromNow(true) + ' ago'}</span>
        </Link>
        <div
          onClick={notificationMenu}
          className={open ? 'notificationMenu hoverMenu' : 'notificationMenu'}
        >
          <BsThreeDots onClick={notificationMenu} />
        </div>

        {open && (
          <>
            <DropDownMenu
              deleteNotification={deleteNotificationMutation}
              updateNotification={updateNotification}
              notification='notification'
              setOpen={setOpen}
            />
          </>
        )}
        {!notification.read && <div className='activeNoitification'></div>}
      </div>
    </div>
  )
}

export default NotificationCard
