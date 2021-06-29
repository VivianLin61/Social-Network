const PostNotification = require('../../models/PostNotification')
const checkAuth = require('../../util/check-auth')
module.exports = {
  Query: {
    async getNotifications(_, { userId }) {
      try {
        const notifications = await PostNotification.find({ userId })
        if (notifications) {
          return notifications
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createNotification(_, args) {
      const { message, postId, userId } = args
      const newNotification = new PostNotification({
        message,
        postId,
        userId,
        createdAt: new Date().toISOString(),
        read: false,
        active: false,
      })
      const notification = await newNotification.save()
      // // console.log(newNotification)

      return notification
    },
  },
}
