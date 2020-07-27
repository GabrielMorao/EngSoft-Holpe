const Joi = require('joi').extend(require('@hapi/joi-date'))
const Solicitant = require('../db/schemas/Solicitant')
const { json } = require('micro')
const { createError } = require('../errors')
const { JWTParser } = require('../micro-auth/jwt')
const { handleValidation } = require('../joiUtils')
const _ = require('lodash')
const moment = require('moment')

const { sendMail } = require('../micro-email')
const {
  applyEventVolunteer: applyEventTemplateVolunteer,
  unapplyEventVolunteer: unapplyEventTemplateVolunteer,
  applyEventSolicitant: applyEventTemplateSolicitant,
  unapplyEventtSolicitant: unapplyEventTemplateSolicitant
} = require('../micro-email/templates')

const create = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isSolicitant) {

  } else throw createError(403, 'Forbidden')

  const body = await json(req)

  const result = handleValidation(body, Joi.object().keys({
    address: Joi.object().keys({
      street: Joi.string(),
      number: Joi.string(),
      city: Joi.string(),
      country: Joi.string()
    }).requiredKeys('street', 'number', 'city', 'country'),
    initialDate: Joi.date().format('YYYY-MM-DD HH:mm').raw(),
    finalDate: Joi.date().format('YYYY-MM-DD HH:mm').raw(),
    name: Joi.string(),
    details: Joi.string(),
    summary: Joi.string(),
    photo: Joi.string(),
    totalVacancies: Joi.number(),
    volunteers: Joi.array().items(Joi.string())
  }).requiredKeys('name', 'initialDate', 'finalDate', 'totalVacancies'))

  await Solicitant.update(
    { _id: jwt.id },
    { $push: { events: result } }
  )

  const solicitant = await Solicitant.findById(jwt.id)
  delete solicitant.password

  return solicitant
}

const patch = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isSolicitant) {

  } else throw createError(403, 'Forbidden')

  const body = await json(req)

  const result = handleValidation(body, Joi.object().keys({
    id: Joi.string(),
    address: Joi.object().keys({
      street: Joi.string(),
      number: Joi.string(),
      city: Joi.string(),
      country: Joi.string()
    }).requiredKeys('street', 'number', 'city', 'country'),
    initialDate: Joi.date().format('YYYY-MM-DD HH:mm').raw(),
    finalDate: Joi.date().format('YYYY-MM-DD HH:mm').raw(),
    name: Joi.string(),
    details: Joi.string(),
    summary: Joi.string(),
    photo: Joi.string(),
    totalVacancies: Joi.number(),
    volunteers: Joi.array().items(Joi.string())
  }).requiredKeys('id'))

  const eventId = result.id
  delete result.id

  const sendData = {}
  Object.keys(result).forEach(key => {
    const newKey = `events.$.${key}`
    sendData[newKey] = result[key]
  })

  await Solicitant.updateOne(
    { _id: jwt.id, 'events._id': eventId },
    { $set: sendData }
  )

  return Solicitant.findById(jwt.id)
}

const del = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isSolicitant) {

  } else throw createError(403, 'Forbidden')

  const body = await json(req)

  const { id } = handleValidation(body, Joi.object().keys({
    id: Joi.string()
  }).requiredKeys('id'))

  await Solicitant.update(
    { _id: jwt.id },
    { $pull: { events: { _id: id } } }
  )

  return Solicitant.findById(jwt.id)
}

const getApplications = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isVolunteer) {

  } else throw createError(403, 'Forbidden')

  return getUserApplications(jwt.id)
}

const getUserApplications = async (userId) => {
  const solicitantInEvents = await Solicitant.find({
    events: {
      $elemMatch: {
        volunteers: {
          $in: [userId]
        }
      }
    }
  }, { email: 1, events: 1, name: 1 })

  solicitantInEvents.forEach(solicitant => {
    solicitant.events = solicitant.events.filter(event => event.volunteers.includes(userId))

    return solicitant
  })

  return solicitantInEvents
}

const checkDateRange = (startRange, finalRange, toCheck) => {
  const eventInitialDate = moment(startRange)
  const eventFinalDate = moment(finalRange)
  const timeToCheck = moment(toCheck)

  // console.log('eventInitialDate', eventInitialDate.format('DD-MM-YYYY HH:mm'))
  // console.log('eventFinalDate', eventFinalDate.format('DD-MM-YYYY HH:mm'))
  // console.log('timeToCheck', timeToCheck.format('DD-MM-YYYY HH:mm'))
  // console.log(`eventInitialDate.diff(timeToCheck, 'seconds')`, eventInitialDate.diff(timeToCheck, 'seconds'))
  // console.log(`eventFinalDate.diff(timeToCheck, 'seconds')`, eventFinalDate.diff(timeToCheck, 'seconds'))
  // console.log('-------->', eventInitialDate.diff(timeToCheck, 'seconds') <= 0 && eventFinalDate.diff(timeToCheck, 'seconds') >= 0)
  // console.log('\n\n')

  return eventInitialDate.diff(timeToCheck, 'seconds') <= 0 && eventFinalDate.diff(timeToCheck, 'seconds') >= 0
}

const checkCalendarConflict = async (userId, event) => {
  const initialDate = event.initialDate
  const finalDate = event.initialDate

  const ongs = await getUserApplications(userId)
  const applications = _.reduce(ongs, (result, value) => {
    return result.concat(value.events)
  }, [])

  applications.forEach(application => {
    if (application.initialDate && application.finalDate) {
      if (checkDateRange(application.initialDate, application.finalDate, initialDate) || checkDateRange(application.initialDate, application.finalDate, finalDate)) {
        throw createError(400, 'Event duration conflict')
      }
    }
  })
}

const applyForEvent = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isVolunteer) {

  } else throw createError(403, 'Forbidden')

  const body = await json(req)

  const { eventId } = handleValidation(body, Joi.object().keys({
    eventId: Joi.string()
  }).requiredKeys('eventId'))

  const solicitant = await Solicitant.findOne({ events: { $elemMatch: { _id: eventId } } }).lean()
  if (!solicitant) throw createError(404, 'Event does not belong to none Solicitant or event does not exist.')

  const eventSelected = solicitant.events.find(event => event._id.toString() === eventId)
  if (eventSelected.volunteers.find(volunteer => volunteer === jwt.id)) throw createError(400, 'Volunteer already subscribed.')
  await checkCalendarConflict(jwt.id, eventSelected)
  if (eventSelected.volunteers.length >= eventSelected.totalVacancies) throw createError(400, 'Event is full.')

  await Solicitant.updateOne(
    { _id: solicitant._id, 'events._id': eventSelected._id },
    { $push: { 'events.$.volunteers': jwt.id } }
  )

  const templateVolunteer = applyEventTemplateVolunteer(eventSelected.name, eventSelected.initialDate, eventSelected.finalDate)
  const templateSolicitant = applyEventTemplateSolicitant(eventSelected.name)
  await Promise.all([
    sendMail({
      to: jwt.email,
      ...templateVolunteer
    }),
    sendMail({
      to: solicitant.email,
      ...templateSolicitant
    }),
  ])

  const newSolicitant = await Solicitant.findById(solicitant._id, { email: 1, events: 1, name: 1 })
  newSolicitant.events = newSolicitant.events.filter(event => event.volunteers.includes(jwt.id))

  return newSolicitant
}

const unapplyForEvent = async (req, res) => {
  const jwt = JWTParser(req)

  if (jwt && jwt.isVolunteer) {

  } else throw createError(403, 'Forbidden')

  const body = await json(req)

  const { eventId } = handleValidation(body, Joi.object().keys({
    eventId: Joi.string()
  }).requiredKeys('eventId'))

  const solicitant = await Solicitant.findOne({ events: { $elemMatch: { _id: eventId } } }).lean()
  if (!solicitant) throw createError(404, 'Event does not belong to none Solicitant or event does not exist.')

  const eventSelected = solicitant.events.find(event => event._id.toString() === eventId)
  if (!eventSelected.volunteers.find(volunteer => volunteer === jwt.id)) throw createError(400, 'Volunteer is not subscribed.')
  if (eventSelected.volunteers.length >= eventSelected.totalVacancies) throw createError(400, 'Event is full.')

  await Solicitant.updateOne(
    { _id: solicitant._id, 'events._id': eventSelected._id },
    { $pull: { 'events.$.volunteers': jwt.id } }
  )

  const templateVolunteer = unapplyEventTemplateVolunteer(eventSelected.name)
  const templateSolicitant = unapplyEventTemplateVolunteer(eventSelected.name)
  await Promise.all([
    sendMail({
      to: jwt.email,
      ...templateVolunteer
    }),
    sendMail({
      to: solicitant.email,
      ...templateSolicitant
    }),
  ])

  const newSolicitant = await Solicitant.findById(solicitant._id, { email: 1, events: 1, name: 1 })
  newSolicitant.events = newSolicitant.events.filter(event => event.volunteers.includes(jwt.id))

  return newSolicitant
}

const lib = {
  create,
  patch,
  del,
  applyForEvent,
  unapplyForEvent,
  getApplications
}

module.exports = lib
