import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import { VscChevronRight } from 'react-icons/vsc'
function Profile() {
  const user = useContext(AuthContext).user
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  )
  const imageHandler = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  function UpdateItem(props) {
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
        <div className='update_item'>
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
  return (
    <>
      {user ? (
        <div className='profile_container'>
          <h4>Account Info</h4>
          <UpdateItem value='' name='PHOTO' />
          <UpdateItem value={user.username} name='USERNAME' />
          <UpdateItem value={user.email} name='EMAIL' />
          <UpdateItem value='••••••••' name='PASSWORD' />
        </div>
      ) : (
        <> </>
      )}
    </>
  )
}

export default Profile
