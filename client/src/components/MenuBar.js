import React, { useContext, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname

  const path = pathname === '/' ? 'home' : pathname.substr(1)

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
            <Nav.Link href={'/login'}>Logout</Nav.Link>
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
