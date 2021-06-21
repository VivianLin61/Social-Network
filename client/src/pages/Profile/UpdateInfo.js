import React from 'react'
import { VscChevronRight } from 'react-icons/vsc'
function UpdateInfo(props) {
  const { imageHandler, profileImg } = props
  if (props.name === 'PHOTO') {
    return (
      <>
        {' '}
        <div className='update_photo'>
          <div className='info'>
            <div>{props.name}</div>
            <div>Add a photo to your account</div>
          </div>
          <div className='img-holder'>
            <input
              type='file'
              accept='image/*'
              name='image-upload'
              id='profile_input'
              onChange={imageHandler}
            />
            <label className='image-upload' htmlFor='profile_input'>
              <img alt='none' src={profileImg} />
            </label>
          </div>{' '}
        </div>
        <hr />
      </>
    )
  }
  return (
    <>
      {' '}
      <div onClick={props.handleUpdateInfo} className='update_item'>
        <div className='info'>
          <div>{props.name}</div>
          <div>{props.value}</div>
        </div>
        <div className='update_icon'>
          <VscChevronRight />
        </div>
      </div>
      <hr />
    </>
  )
}

export default UpdateInfo
