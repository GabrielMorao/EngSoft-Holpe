const Schema = require('mongoose').Schema
const uniqueValidator = require('mongoose-unique-validator')

const AddressSchema = require('./Address')

const EventSchema = new Schema({
  photo: String,
  address: AddressSchema,
  initialDate: Date,
  finalDate: Date,
  name: String,
  details: String,
  summary: String,
  food: Boolean,
  certificate: Boolean,
  transport: Boolean,
  totalVacancies: Number,
  volunteers: [String]
})

EventSchema.plugin(uniqueValidator)

module.exports = EventSchema
