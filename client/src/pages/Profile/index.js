import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import UpdateInfo from './UpdateInfo.js'
import UpdateInfoModal from './UpdateInfoModal.js'
function Profile() {
  const user = useContext(AuthContext).user
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  )
  const [updateModal, showUpdateModal] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const imageHandler = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const handleUpdateUsername = (e) => {
    showUpdateModal(!updateModal)
    setUpdateType('Username')
  }
  const handleUpdatePassword = (e) => {
    showUpdateModal(!updateModal)
    setUpdateType('Password')
  }
  const handleUpdateEmail = (e) => {
    showUpdateModal(!updateModal)
    setUpdateType('Email')
  }
  return (
    <>
      {user ? (
        <div className='profile_container'>
          <h4>Account Info</h4>
          <UpdateInfo
            profileImg={profileImg}
            imageHandler={imageHandler}
            value=''
            name='PHOTO'
          />
          <UpdateInfo
            value={user.username}
            handleUpdateInfo={handleUpdateUsername}
            name='USERNAME'
          />
          <UpdateInfo
            handleUpdateInfo={handleUpdateEmail}
            value={user.email}
            name='EMAIL'
          />
          <UpdateInfo
            value='••••••••'
            handleUpdateInfo={handleUpdatePassword}
            name='PASSWORD'
          />

          <UpdateInfoModal
            show={updateModal}
            onHide={() => showUpdateModal(false)}
            updateType={updateType}
            user={user}
          />
        </div>
      ) : (
        <> </>
      )}
    </>
  )
}

export default Profile
