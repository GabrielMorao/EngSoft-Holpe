// Micro deps
const { router, post, get, patch, del } = require('microrouter')
const { handleErrors, createError } = require('./errors')

/*
  The best solution were build microsservices, but we dont have any budget to deploy many intances, so we must have only one
  I separeted in modules, it become easier to maintain
*/
const volunteerModule = require('./micro-user/volunteer')
const solicitantModule = require('./micro-user/solicitant')
const authVolunteerModule = require('./micro-auth/volunteer')
const authSolicitantModule = require('./micro-auth/solicitant')
const { uniqLogin } = require('./micro-auth/loginHandler')
const eventModule = require('./micro-event/event')

const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

const papertrail = require('./papertrail')
papertrail(config.papertrail)

/*
  cors enable browser make request
  if we dont put it, front-end will receive “No 'Access-Control-Allow-Origin' header is present on the requested resource”, Farfoela would be sad :,(
*/
const cors = require('micro-cors')({exposeHeaders: ['authorization']})
console.info(`> NODE_ENV: ${env}`)

// connect with db
require('./db')

// if route not found
const notfound = (req, res) => { throw createError(404, 'Not Found') }

const SERVICE_ENTRYPOINT = '/api/v1'

module.exports = cors(
  handleErrors(
    router(
      // micro-auth
      post(`${SERVICE_ENTRYPOINT}/auth`, uniqLogin),
      post(`${SERVICE_ENTRYPOINT}/auth/volunteer`, authVolunteerModule.loginRoutine),
      post(`${SERVICE_ENTRYPOINT}/auth/solicitant`, authSolicitantModule.loginRoutine),

      // micro-user
      post(`${SERVICE_ENTRYPOINT}/user/volunteer`, volunteerModule.create),
      get(`${SERVICE_ENTRYPOINT}/user/volunteer`, volunteerModule.get),
      patch(`${SERVICE_ENTRYPOINT}/user/volunteer`, volunteerModule.patch),
      del(`${SERVICE_ENTRYPOINT}/user/volunteer`, volunteerModule.del),

      post(`${SERVICE_ENTRYPOINT}/user/solicitant`, solicitantModule.create),
      get(`${SERVICE_ENTRYPOINT}/user/solicitant`, solicitantModule.get),
      patch(`${SERVICE_ENTRYPOINT}/user/solicitant`, solicitantModule.patch),
      del(`${SERVICE_ENTRYPOINT}/user/solicitant`, solicitantModule.del),

      // micro-event
      post(`${SERVICE_ENTRYPOINT}/event`, eventModule.create),
      patch(`${SERVICE_ENTRYPOINT}/event`, eventModule.patch),
      del(`${SERVICE_ENTRYPOINT}/event`, eventModule.del),
      post(`${SERVICE_ENTRYPOINT}/event/apply`, eventModule.applyForEvent),
      post(`${SERVICE_ENTRYPOINT}/event/unapply`, eventModule.unapplyForEvent),
      get(`${SERVICE_ENTRYPOINT}/event/apply`, eventModule.getApplications),

      post('/*', notfound),
      get('/*', notfound),
      patch('/*', notfound),
      del('/*', notfound)
    )
  )
)
