const Joi = require('joi')
const { createError } = require('./errors')

const handleValidation = (...args) => {
  const data = Joi.validate(...args)

  if (!data.error) {
    return data.value
  }

  const { details } = data.error
  const firstDetail = details[0]

  switch (data.error.name) {
    case 'ValidationError': throw createError(400, firstDetail.message, [firstDetail.context.key])
    default: throw createError(400, 'Bad params')
  }
}

module.exports = {
  handleValidation
}
