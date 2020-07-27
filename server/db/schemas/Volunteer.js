const Schema = require('mongoose').Schema
const model = require('mongoose').model
const uniqueValidator = require('mongoose-unique-validator')

const AddressSchema = require('./Address')

const Volunteer = new Schema({
  name: String,
  photo: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: Date,
  address: [AddressSchema],
  facebook: String,
  instagram: String,
  profile: String,
  phone: String,
  cpf: String,
  rating: Number
})

Volunteer.plugin(uniqueValidator)

module.exports = model('Volunteer', Volunteer)
