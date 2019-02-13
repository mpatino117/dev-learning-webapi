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
  },
  {
    method: 'POST',
    path: '/user/signup',
    handler: controllers.users.userSignup,
  }
];