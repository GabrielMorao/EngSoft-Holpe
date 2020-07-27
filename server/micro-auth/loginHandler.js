/*
 login workflow for  ONGs, Volunteers or other stackholder is the same
 we need to find the user in the specific Schema and check if the password sent matchs with the password stored
 If everything is fine we need to create a JWT with the emai, password and some key to indentify the role like isUser, is Volunteer, isEmoTriste
*/

const { json } = require('micro')
const bcrypt = require('bcrypt')
const JWT = require('./jwt')

const Solicitant = require('../db/schemas/Solicitant')
const Volunteer = require('../db/schemas/Volunteer')

const { createError } = require('../errors')

const loginHandler = async (req, res, Schema, auth) => {
  const body = await json(req)
  const { email, password } = body

  if (!email || !password) {
    throw createError(400, 'Bad params. Email and password are required fields')
  }

  const user = await Schema.findOne({ email })
  if (!user) throw createError(400, 'Bad request. User does not exist')

  const isUser = await bcrypt.compare(password, user.password)
  if (!isUser) throw createError(403, 'Forbidden. Wrong password')

  const dataToToken = {
    email,
    id: user._id
  }

  dataToToken[auth] = true

  JWT.createToken(res, dataToToken)
  return user
}

const uniqLogin = async (req, res) => {
  const body = await json(req)
  const { email, password } = body

  if (!email || !password) {
    throw createError(400, 'Bad params. Email and password are required fields')
  }

  const [userSolicitant, userVolunteer] = await Promise.all([
    Solicitant.findOne({ email }),
    Volunteer.findOne({ email })
  ])

  const dataToToken = {
    email
  }

  let user
  if (userSolicitant) {
    dataToToken['isSolicitant'] = true
    user = userSolicitant
  } else if (userVolunteer) {
    dataToToken['isVolunteer'] = true
    user = userVolunteer
  } else throw createError(400, 'Bad request. User does not exist')

  const isUser = await bcrypt.compare(password, user.password)
  if (!isUser) throw createError(403, 'Forbidden. Wrong password')

  dataToToken.id = user._id

  JWT.createToken(res, dataToToken)
  return user
}

module.exports = {
  loginHandler,
  uniqLogin
}
