const Volunteer = require('../db/schemas/Volunteer')
const { json } = require('micro')
const { hashPassword } = require('./utils')
const { createError } = require('../errors')
const { JWTParser } = require('../micro-auth/jwt')

const { sendMail } = require('../micro-email')
const { signUp: signUpTemplate } = require('../micro-email/templates')

const create = async (req, res) => {
  const body = await json(req)
  const { email, password } = body

  if (!email || !password) {
    throw createError(400, 'Bad params. Email and password are required fields')
  }

  const userIsCreated = await Volunteer.find({ email })

  if (userIsCreated && userIsCreated.length) {
    throw createError(409, 'User Already Exists')
  }

  const passwordHashed = await hashPassword(password)
  const user = {
    ...body,
    password: passwordHashed
  }

  const userCreated = await Volunteer.create(user)
  delete userCreated.password

  const emailTemplate = signUpTemplate(userCreated.name)

  await sendMail({
    to: userCreated.email,
    ...emailTemplate
  })

  return userCreated
}

const get = async (req, res) => {
  const getUserByUser = async (id) => {
    return Volunteer.findOne({ _id: id })
  }

  const getUserBySolicitant = async () => {
    return Volunteer.find(req.query, { email: 1, name: 1, phone: 1 })
  }

  const getUSerByRole = async () => {
    const jwt = JWTParser(req, res)

    if (jwt) {
      if (jwt.isVolunteer) return getUserByUser(jwt.id)
      if (jwt.isSolicitant) return getUserBySolicitant(jwt.id)
    } else throw createError(403, 'Forbidden')
  }

  return getUSerByRole()
}

const patch = async (req, res) => {
  const body = await json(req)
  const jwt = JWTParser(req, res)

  if (jwt && jwt.isVolunteer) {
    // ok
  } else throw createError(403, 'Forbidden')

  const id = jwt.id

  const userIsCreated = await Volunteer.findById(id)

  if (!userIsCreated) {
    throw createError(400, 'Bad request. User does not exist')
  }

  // we dont want send the password to the front
  delete body.password

  const sendData = {
    ...body
  }

  delete sendData._id

  // update and fetch the new data, we need to fetch because what is returned is the old data
  await Volunteer.findByIdAndUpdate(id, sendData)
  const updatedUser = await Volunteer.findById(id)

  return updatedUser
}

const del = async (req, res) => {
  // check the JWT sent in the header
  const jwt = JWTParser(req, res)
  if (jwt && jwt.isVolunteer) {
    // ok
  } else throw createError(403, 'Forbidden')

  // check if user exist
  const id = jwt.id
  const userIsCreated = await Volunteer.findById(id)

  if (!userIsCreated) {
    throw createError(400, 'Bad request. User does not exist')
  }

  // delete and fetch the new data, we need to fetch because what is returned is the old data
  const userDeleted = await Volunteer.deleteOne({ _id: id })
  return userDeleted.deletedCount
}

const lib = {
  create,
  get,
  patch,
  del
}

module.exports = lib
