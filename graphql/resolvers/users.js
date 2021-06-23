const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const ObjectId = require('mongoose').Types.ObjectId
const {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateInput,
} = require('../../util/validators')

const User = require('../../models/User')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = {
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
      let updated
      if (username) {
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
        updated = await User.updateOne(
          { _id: objectId },
          { $set: { email: email } }
        )
      }
      const updatedUser = await User.findOne({ _id: objectId })
      return updatedUser
    },
  },
}
