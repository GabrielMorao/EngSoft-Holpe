const Schema = require('mongoose').Schema
const uniqueValidator = require('mongoose-unique-validator')

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  complements: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

AddressSchema.plugin(uniqueValidator)

module.exports = AddressSchema
