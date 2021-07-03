const PostNotification = require('../../models/PostNotification')
const checkAuth = require('../../util/check-auth')

const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
  Query: {
    async getNotifications(_, { userId }) {
      try {
        const notifications = await PostNotification.find({ userId })
        if (notifications) {
          const reverse = notifications.reverse()
          return reverse
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
      return notification
    },

    async deleteNotification(_, args) {
      const { id } = args
      try {
        const notification = await PostNotification.findById(id)
        await notification.delete()
        return 'Notification deleted successfully'
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateNotification(_, args) {
      const { id } = args
      const objectId = new ObjectId(id)
      const updated = await PostNotification.updateOne(
        { _id: objectId },
        {
          $set: { read: true },
        }
      )
      const notification = await PostNotification.findOne({ _id: objectId })
      return notification
    },
  },
}
