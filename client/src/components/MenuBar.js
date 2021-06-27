import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions'
function MenuBar() {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (auth) {
      setUser(auth)
    } else {
      setUser(null)
    }
  }, [auth])

  const menuBar =
    user != null ? (
      <>
        <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
          <Nav.Item as='li'>
            <Nav.Link href='/'>Social</Nav.Link>
          </Nav.Item>

          <div className='rightMenu'>
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
