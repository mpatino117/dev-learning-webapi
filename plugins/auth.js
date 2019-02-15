const jwtPlugin = require('hapi-auth-jwt2')
const log = require('torch')
const Model = require("../models")

const JWT_KEY = process.env.JWT_KEY

exports.configureAuth = async (server) => {
  await server.register(jwtPlugin)
  server.auth.strategy('jwt', 'jwt', {
    key: JWT_KEY,
    verifyOptions: {
      algorithms: ['HS256']
    },
    validate: async (decoded, request) => {
      try {
        return {
          isValid: true,
          credentials: await Model.User.findById(decoded.id)
        };
      } catch (error) {
            log.red(error)
          return {
          isValid: false
        };
      }

    }
  })


  server.auth.default('jwt')
}