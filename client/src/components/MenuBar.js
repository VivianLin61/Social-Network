import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname

  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    //show user name and logout
    <>
      <Nav defaultActiveKey='/' as='ul' className='loggedInNavBar'>
        <Nav.Item as='li'>
          <Nav.Link href='/'>Social</Nav.Link>
        </Nav.Item>

        <div className='rightMenu'>
          <Nav.Item onClick={handleItemClick} as='li'>
            <Nav.Link href={`/profile/${user.id}`}>{user.username}</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li' onClick={logout}>
            <Nav.Link>Logout</Nav.Link>
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
        <Nav.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as='li'
        >
          <Nav.Link href={`/login`}>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item
          as='li'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          name='register'
        >
          <Nav.Link href='/register'>Register</Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  )

  return menuBar
}

export default MenuBar
