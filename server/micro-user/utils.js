const bcrypt = require('bcrypt')

const hashPassword = async (pass) => {
  return bcrypt.hash(pass, 10)
}

module.exports = {
  hashPassword
}
