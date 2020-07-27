const Volunteer = require('../db/schemas/Volunteer')
const { loginHandler } = require('./loginHandler')

const loginRoutine = async (req, res) => {
  const user = await loginHandler(req, res, Volunteer, 'isVolunteer')
  return user
}

const lib = {
  loginRoutine
}

module.exports = lib
