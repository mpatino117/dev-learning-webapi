const jwtPlugin = require('hapi-auth-jwt2')
const log = require('torch')
const db = require("../db/db")

const JWT_KEY = process.env.JWT_KEY

exports.configureAuth = async (server) => {
  await server.register(jwtPlugin)
  server.auth.strategy('jwt', 'jwt', {
    key: JWT_KEY,
    verifyOptions: {
      algorithms: ['HS256']
    },
    validate: async (decoded, request) => {
      let user = await db('users').where({id: decoded.id})
      console.log(user[0])
      try {
        return {
          isValid: true,
          credentials: user[0]
        };
      } catch (error) {
          return {
          isValid: false
        };
      }

    }
  })


  server.auth.default('jwt')
}