const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const aws = require('aws-sdk')
const { UserInputError } = require('apollo-server')
const ObjectId = require('mongoose').Types.ObjectId
const {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateInput,
} = require('../../util/validators')
const fs = require('fs')
const path = require('path')
const User = require('../../models/User')
const env = require('dotenv')

env.config()
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Query: {
    async getUser(_, args) {
      const { userId } = args
      const objectId = new ObjectId(userId)
      const user = await User.findOne({ _id: objectId })
      return user
    },
  },

  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ email })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong crendetials'
        throw new UserInputError('Wrong crendetials', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        profileImage:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
    async updateUser(_, args) {
      const {
        username,
        email,
        password,
        confirmPassword,
        currentPassword,
        _id,
      } = args
      const objectId = new ObjectId(_id)
      const user = await User.findOne({ _id: objectId })
      // Validate user data
      const { valid, errors } = validateUpdateInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      if (currentPassword) {
        const match = await bcrypt.compare(currentPassword, user.password)
        if (!match) {
          errors.general = 'Current password is incorrect '
          throw new UserInputError('Current password is incorrect ', { errors })
        }
      }
      if (!valid) {
        console.log(errors)
        throw new UserInputError('Errors', { errors })
      }
      if (username) {
        const user = await User.findOne({ username })
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken',
            },
          })
        }
        updated = await User.updateOne(
          { _id: objectId },
          { $set: { username: username } }
        )
      } else if (password) {
        pWord = await bcrypt.hash(password, 12)
        updated = await User.updateOne(
          { _id: objectId },
          { $set: { password: pWord } }
        )
      } else if (email) {
        const user = await User.findOne({ email })
        if (user) {
          throw new UserInputError('Email already exists', {
            errors: {
              email: 'Email already exists',
            },
          })
        }
        updated = await User.updateOne(
          { _id: objectId },
          { $set: { email: email } }
        )
      }

      const updatedUser = await User.findOne({ _id: objectId })
      return updatedUser
    },
    addProfileImage: async (_, args) => {
      const { _id, url } = args

      const objectId = new ObjectId(_id)

      const updated = await User.updateOne(
        { _id: objectId },
        { $set: { profileImage: url } }
      )

      // await myfile.pipe(fs.createWriteStream(location))
      const updatedUser = await User.findOne({ _id: objectId })
      return updatedUser
    },
    async signS3(parent, { filename, filetype }) {
      // AWS_ACCESS_KEY_ID
      // AWS_SECRET_ACCESS_KEY
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-1',
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
      })

      const s3Params = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read',
      }

      const signedRequest = await s3.getSignedUrl('putObject', s3Params)
      const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${filename}`

      return {
        signedRequest,
        url,
      }
    },
  },
}
