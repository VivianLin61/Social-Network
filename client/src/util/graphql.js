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
      }
      userId
      commentCount
      comments {
        id
        username
        createdAt
        body
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
    }
  }
`
