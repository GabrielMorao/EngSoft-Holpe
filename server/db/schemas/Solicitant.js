const Schema = require('mongoose').Schema
const model = require('mongoose').model
const uniqueValidator = require('mongoose-unique-validator')

const AddressSchema = require('./Address')
const EventSchema = require('./Event')

const Solicitant = new Schema({
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
  address: [AddressSchema],
  events: [EventSchema],
  facebook: String,
  instagram: String,
  profile: String,
  phone: String,
  cnpj: String,
  cpf: Number,
  rating: Number
})

Solicitant.plugin(uniqueValidator)

module.exports = model('Solicitant', Solicitant)
