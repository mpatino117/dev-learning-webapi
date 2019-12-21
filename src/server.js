'use strict'

require('dotenv').config()

const Hapi = require('hapi')
const log = require('torch')
const routes = require('./routes')
const {configureAuth} = require('./plugins/auth')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const assertDatabaseConnection = () => {
  return database.raw('select 1+1 as result').catch(err => {
    console.log('[Fatal] Failed to establish connection to database! Exiting...')
    console.log(err)
    process.exit(1)
  })
}

const server = Hapi.server({
  port: process.env.API_PORT || 3000,
  host: process.env.API_HOST || 'localhost',
  routes: {
    cors: {
      credentials: false,
    },
  },
})

const init = async () => {
  await assertDatabaseConnection()
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart'],
    },
  })

  await configureAuth(server)

  await server.route(routes)

  await server.start()

  log.green(`Server running at: ${server.info.uri}`)
}

init()

module.exports = server
