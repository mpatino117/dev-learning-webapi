const controllers = require('./controllers');
const log = require('torch')
const Joi = require("joi")

module.exports = [{
    method: 'GET',
    path: '/',
    handler: controllers.users.get,
   
  },
  {
    method: 'POST',
    path: '/',
    handler: controllers.users.post,
    options: {
      auth: 'simple'
  }
  }

];