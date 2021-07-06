import React, { useState, useEffect } from 'react'
import UpdateInfo from './UpdateInfo.js'
import UpdateInfoModal from './UpdateInfoModal.js'
import { useMutation } from '@apollo/react-hooks'
import { updateUser } from '../../actions'
import { gql } from '@apollo/client'
import { useForm } from '../../util/hooks'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
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

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    }
    await axios.put(signedRequest, file, options)
  }

  const [s3Sign] = useMutation(SIGN_S3_MUTATION)
  const formatFilename = (filename) => {
    const date = moment().format('YYYYMMDD')
    const randomString = Math.random().toString(36).substring(2, 7)
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`
    return newFilename.substring(0, 60)
  }

  const imageHandler = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result)
      }
    }
    if (!file) return

    let response = await s3Sign({
      variables: {
        filename: formatFilename(file.name),
        filetype: file.type,
      },
    })

    await uploadToS3(file, response.data.signS3.signedRequest)

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
            popup={show ? true : undefined}
            onShow={setShow}
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
export const SIGN_S3_MUTATION = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      signedRequest
      url
    }
  }
`

export default Profile
