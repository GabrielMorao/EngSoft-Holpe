const env = process.env.NODE_ENV
const config = require('../config')[env]
const jwt = require('jsonwebtoken')
const { createError } = require('../errors')

const createToken = (res, objectToSign) => {
  const newToken = jwt.sign(objectToSign, config.secret)
  res.setHeader('Authorization', newToken)
  return newToken
}

const JWTParser = (req, res) => {
  if (!req.headers.authorization) {
    throw createError(401, 'Needs Authentication')
  }

  const token = req.headers.authorization.split(' ').pop()
  return jwt.decode(token)
}

const lib = {
  createToken,
  JWTParser
}

module.exports = lib
