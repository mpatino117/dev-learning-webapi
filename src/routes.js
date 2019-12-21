const controllers = require('./controllers')

module.exports = [
  {
    method: 'GET',
    path: '/user',
    handler: controllers.users.allUsers,
    config: {auth: 'jwt'},
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: controllers.users.login,
    config: {auth: false},
  },
  {
    method: 'POST',
    path: '/user/signup',
    handler: controllers.users.userSignup,
    config: {auth: false},
  },
]
