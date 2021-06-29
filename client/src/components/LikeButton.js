import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { CREATE_NOTIFICATION } from '../util/graphql.js'
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted: () => {
      if (!liked) {
        //Only create notification when user has liked
        createLikeNotification()
      }
    },
  })

  const [createLikeNotification] = useMutation(CREATE_NOTIFICATION, {
    variables: {
      message: user ? `${user.username} liked your post` : '',
      postId: id,
      userId: user ? user.id : '',
    },
    onError(err) {
      console.log(err)
    },
  })

  const likeButton = user ? (
    liked ? (
      <button className='likedButton'>
        <FcLike onClick={likePost} style={{ fontSize: '20px' }} />
      </button>
    ) : (
      <button className='likeButton'>
        <FcLikePlaceholder
          onClick={likePost}
          style={{ pointerEvents: 'auto', fontSize: '20px' }}
        />
      </button>
    )
  ) : (
    <FcLikePlaceholder
      // as={Link}
      className='likeButton'
      // to='/login'
      style={{ fontSize: '20px' }}
    />
  )

  return (
    <>
      {likeButton} <span className='commentAndLikeCount'>{likeCount}</span>
    </>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`
export default LikeButton
