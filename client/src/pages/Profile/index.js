import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import UpdateInfo from './UpdateInfo.js'
import UpdateInfoModal from './UpdateInfoModal.js'
import { useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client'
import { useForm } from '../../util/hooks'
function Profile() {
  const user = useContext(AuthContext).user
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  )
  const [updateModal, showUpdateModal] = useState(false)
  const [updateType, setUpdateType] = useState('')

  const { onChange, onSubmit, values } = useForm(updateUser)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [errors, setErrors] = useState({})
  const [changeUserInfo, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      console.log(userData)
      showUpdateModal(false)
      setEmail(userData.email)
      setUsername(userData.username)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: {
      ...values,
      _id: user.id,
    },
  })
  function updateUser() {
    changeUserInfo()
  }
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
            value={username}
            handleUpdateInfo={handleUpdateUsername}
            name='USERNAME'
          />
          <UpdateInfo
            handleUpdateInfo={handleUpdateEmail}
            value={email}
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
            type={updateType}
            user={user}
            onChange={onChange}
            onSubmit={onSubmit}
            values={values}
            errors={errors}
          />
        </div>
      ) : (
        <> </>
      )}
    </>
  )
}
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $_id: String!
    $email: String
    $password: String
    $username: String
    $currentPassword: String
    $confirmPassword: String
  ) {
    updateUser(
      _id: $_id
      email: $email
      password: $password
      username: $username
      currentPassword: $currentPassword
      confirmPassword: $confirmPassword
    ) {
      username
      email
    }
  }
`

export default Profile
