import React from 'react'
import { TiEdit } from 'react-icons/ti'
import { BiTrash } from 'react-icons/bi'
function DropDownMenu(props) {
  function handleEdit() {
    console.log('edit')
  }

  function handleDelete() {
    props.setShowDeleteModal(true)
    props.setOpen(false)
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
    <div className='dropdown'>
      <div className='square'></div>
      <DropdownItem handleDropdown={handleEdit}>
        <TiEdit />
        <span>Edit</span>
      </DropdownItem>
      <DropdownItem handleDropdown={handleDelete}>
        <BiTrash />
        <span>Delete</span>
      </DropdownItem>
    </div>
  )
}

export default DropDownMenu
