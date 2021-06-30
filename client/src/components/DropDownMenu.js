import React from 'react'
import { TiEdit } from 'react-icons/ti'
import { BiTrash, BiCheck } from 'react-icons/bi'
function DropDownMenu(props) {
  function handleEdit() {
    if (props.notification) {
      console.log('mark read')
      props.updateNotification()
    }
  }

  function handleDelete() {
    if (!props.notification) {
      props.setShowDeleteModal(true)
      props.setOpen(false)
    } else {
      props.deleteNotification()
    }
  }
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
    <div className={props.notification ? 'notification dropdown' : 'dropdown'}>
      <div className='square'></div>
      <DropdownItem handleDropdown={handleEdit}>
        {props.notification ? (
          <>
            <BiCheck />
            <span>Mark Read</span>
          </>
        ) : (
          <>
            <TiEdit />
            <span>Edit</span>
          </>
        )}
      </DropdownItem>
      <DropdownItem handleDropdown={handleDelete}>
        <BiTrash />
        <span>Delete</span>
      </DropdownItem>
    </div>
  )
}

export default DropDownMenu
