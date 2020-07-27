const Solicitant = require('../db/schemas/Solicitant')
const { loginHandler } = require('./loginHandler')

const loginRoutine = async (req, res) => {
  const user = await loginHandler(req, res, Solicitant, 'isSolicitant')
  return user
}

const lib = {
  loginRoutine
}

module.exports = lib
