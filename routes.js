const controllers = require('./controllers');
const log = require('torch')
const Joi = require("joi")

module.exports = [{
    method: 'GET',
    path: '/',
    handler: controllers.users.get

  },
  {
    method: 'POST',
    path: '/user/signup',
    handler: controllers.users.signUp,
  },
  {
    method: 'POST',
    path: '/user/signin',
    handler: controllers.users.signIn,
  }
];