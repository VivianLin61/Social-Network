import React, { useState, useEffect } from 'react'
import UpdateInfo from './UpdateInfo.js'
import UpdateInfoModal from './UpdateInfoModal.js'
import { useMutation } from '@apollo/react-hooks'
import { updateUser } from '../../actions'
import { gql } from '@apollo/client'
import { useForm } from '../../util/hooks'
import { useDispatch, useSelector } from 'react-redux'
function Profile() {
  const auth = useSelector((state) => state.auth.user)
  const [show, setShow] = useState(false)
  const [profileImg, setProfileImg] = useState('')
  const dispatch = useDispatch()
  const [updateModal, showUpdateModal] = useState(false)
  const [user, setUser] = useState({})
  const [updateType, setUpdateType] = useState('')
  const { onChange, resetValues, onSubmit, values } = useForm(updateUserInfo)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [changeUserInfo] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      showUpdateModal(false)
      setShow(false)
      setEmail(userData.email)
      setUsername(userData.username)
      dispatch(updateUser(userData))
      resetValues()
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
      setShow(false)
      resetValues()
    },
    variables: {
      ...values,
      _id: user ? user.id : '',
    },
  })
  useEffect(() => {
    if (auth) {
      setProfileImg(auth.profileImage)
      setUsername(auth.username)
      setEmail(auth.email)
      setUser(auth)
    }
  }, [auth])
  const [updateUserImage] = useMutation(ADD_PROFILE_IMAGE, {
    onCompleted: (data) => dispatch(updateUser(data.addProfileImage)),
  })
  function updateUserInfo() {
    if (values.password && values.confirmPassword && values.currentPassword) {
      changeUserInfo()
    } else if (values.username || values.email) {
      changeUserInfo()
    }
  }
  const imageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    if (!file) return

    updateUserImage({
      variables: { file, _id: user ? user.id : '' },
    })
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
            popup={show}
            setShow={setShow}
          />
        </div>
      ) : (
        <> </>
      )}
    </>
  )
}

export const ADD_PROFILE_IMAGE = gql`
  mutation AddProfileImage($_id: String!, $file: FileUpload!) {
    addProfileImage(_id: $_id, file: $file) {
      username
      email
      profileImage
      id
    }
  }
`
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
      profileImage
      id
    }
  }
`

export default Profile
