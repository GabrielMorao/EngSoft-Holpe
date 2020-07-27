const Solicitant = require('../db/schemas/Solicitant')
const { json } = require('micro')
const { hashPassword } = require('./utils')
const { createError } = require('../errors')
const { JWTParser } = require('../micro-auth/jwt')

const create = async (req, res) => {
  const body = await json(req)
  const { email, password } = body

  if (!email || !password) {
    throw createError(400, 'Bad params. Email and password are required fields')
  }

  const userIsCreated = await Solicitant.find({ email })

  if (userIsCreated && userIsCreated.length) {
    throw createError(409, 'User Already Exists')
  }

  const passwordHashed = await hashPassword(password)
  const user = {
    ...body,
    password: passwordHashed
  }

  const userCreated = await Solicitant.create(user)
  delete userCreated.password

  return userCreated
}

const get = async (req, res) => {
  const getSolicitantBySolicitant = async (id) => {
    return Solicitant.findOne({ _id: id })
  }

  const publicGetSolicitant = async () => {
    return Solicitant.find({}, { email: 1, events: 1, name: 1 })
  }

  const getSolicitantByRole = async () => {
    if (req.headers.authorization) {
      const jwt = JWTParser(req, res)
      if (jwt && jwt.isSolicitant) return getSolicitantBySolicitant(jwt.id)
    }

    return publicGetSolicitant()
  }

  return getSolicitantByRole()
}

const patch = async (req, res) => {
  const body = await json(req)
  const jwt = JWTParser(req, res)

  if (jwt && jwt.isSolicitant) {
    // ok
  } else throw createError(403, 'Forbidden')

  const id = jwt.id

  const userIsCreated = await Solicitant.findById(id)

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
  await Solicitant.findByIdAndUpdate(id, sendData)
  const updatedUser = await Solicitant.findById(id)

  return updatedUser
}

const del = async (req, res) => {
  // check the JWT sent in the header
  const jwt = JWTParser(req, res)
  if (jwt && jwt.isSolicitant) {
    // ok
  } else throw createError(403, 'Forbidden')

  // check if user exist
  const id = jwt.id
  const userIsCreated = await Solicitant.findById(id)

  if (!userIsCreated) {
    throw createError(400, 'Bad request. User does not exist')
  }

  // delete and fetch the new data, we need to fetch because what is returned is the old data
  const userDeleted = await Solicitant.deleteOne({ _id: id })
  return userDeleted.deletedCount
}

const lib = {
  create,
  get,
  patch,
  del
}

module.exports = lib
