const controllers = require('./controllers');

module.exports = [{
    method: 'GET',
    path: '/user',
    handler: controllers.users.allUsers
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: controllers.users.login,
    config: { auth: false }
  },
  {
    method: 'POST',
    path: '/user/signup',
    handler: controllers.users.userSignup,
    config: { auth: false }
  }
];