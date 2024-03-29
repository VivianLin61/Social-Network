const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../util/check-auth')
const Post = require('../../models/Post')
const User = require('../../models/User.js')
module.exports = {
  Mutation: {
    createComment: async (_, { commenterId, postId, body }, context) => {
      const { username, id } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        })
      }

      const post = await Post.findById(postId)
      const user = await User.findById(commenterId)

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
          image: user.profileImage,
          userId: id,
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username, id } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)

        if (post.comments[commentIndex].userId === id) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    },
  },
}
