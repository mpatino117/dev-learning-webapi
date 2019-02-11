"use strict";

const bcrypt = require('bcrypt');
const Model = require('../models')
const Boom = require('boom')
const jwt = require('jsonwebtoken');

const privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';


const hashPassword = (password, cb) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

const verifyUniqueUser = (request, response) => {

  Model.User.findAll({
      where: {
        email: request.email
      }
    })
    .then(user => {
      reply(user).code(201);

    })
    .catch(err => {
      throw Boom.badRequest(err);
    })

}


function createToken(user) {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign({
    id: user._id,
    username: user.username,
    scope: scopes
  }, 'secret', {
    algorithm: 'HS256',
    expiresIn: "24h"
  });
}


function verifyCredentials(req, res) {
  const password = req.payload.password;
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({ 
    $or: [ 
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          res(user);
        }
        else {
          res(Boom.badRequest('Incorrect password!'));
        }
      });
    } else {
      res(Boom.badRequest('Incorrect username or email!'));
    }
  });
}


module.exports = hashPassword;
module.exports = verifyUniqueUser;
module.exports = createToken;