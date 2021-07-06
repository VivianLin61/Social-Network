import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
        userId
      }
      userId
      commentCount
      comments {
        id
        username
        createdAt
        body
        userId
      }
    }
  }
`

export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications($userId: String!) {
    getNotifications(userId: $userId) {
      id
      message
      postId
      userId
      createdAt
      read
    }
  }
`

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      profileImage
    }
  }
`
export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $postId: String!
    $userId: String!
    $message: String!
  ) {
    createNotification(postId: $postId, message: $message, userId: $userId) {
      id
      message
      postId
      userId
      createdAt
      read
    }
  }
`

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($id: ID!) {
    updateNotification(id: $id) {
      id
    }
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id)
  }
`
export const SIGN_S3_MUTATION = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype)
  }
`
