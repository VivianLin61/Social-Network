import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
function MenuBar() {
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    //show user name and logout
    <>
      <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
        <Nav.Item as='li'>
          <Nav.Link href='/'>Social</Nav.Link>
        </Nav.Item>

        <div className='rightMenu'>
          <Nav.Item as='li'>
            <Nav.Link href={`/profile/${user.id}`}>{user.username}</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li' onClick={logout}>
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
