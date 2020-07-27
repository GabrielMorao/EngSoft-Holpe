const winston = require('winston')
const { Papertrail } = require('winston-papertrail')

const configure = (input) => {
  if (!input) return console.warn('micro-papertrail not configured. host and port are required!')
  if (!input.program) return console.warn('micro-papertrail not configured. program is required!')
  if (!input.host) return console.warn('micro-papertrail not configured. host is required!')
  if (!input.port) return console.warn('micro-papertrail not configured. port is required!')

  input.debug = input.debug !== false // debug mode toggles console.debug method. Default is true

  // Initialize Papertrail transport
  const papertrailTransport = new Papertrail({
    program: input.program,
    host: input.host,
    port: input.port,
    hostname: process.env.NOW_URL || 'local',
    depth: input.depth || 2,
    colorize: input.colorize || true
  })

  // On papertrail error, use old console.info to log (So it will be logged on deployment, but not on Papertrail)
  // Get console.info reference
  const oldConsoleInfo = console.info

  papertrailTransport.on('error', (err) => {
    oldConsoleInfo(err)
  })

  // On papertrail connect, log message
  papertrailTransport.on('connect', (message) => {
    oldConsoleInfo(message)
  })

  // Instantiate logger
  const logger = new winston.Logger({
    level: 'info',
    transports: [
      new winston.transports.Console({ prettyPrint: (object) => JSON.stringify(object, null, 2) }),
      papertrailTransport
    ]
  })

  // Override consoles to be sent to Papertrail
  console.log = (...args) => logger.info(...args)
  console.info = (...args) => logger.info(...args)
  console.warn = (...args) => logger.warn(...args)
  console.error = (...args) => logger.error(...args)
  console.debug = input.debug ? (...args) => logger.info(...args) : () => {}
}

module.exports = configure
