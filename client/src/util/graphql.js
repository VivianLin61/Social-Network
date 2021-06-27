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

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      profileImage
    }
  }
`
