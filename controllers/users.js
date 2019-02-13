"use strict";

const Model = require('../models');
const Boom = require('boom')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    login: function (request, reply) {
        let {
            email,
            password
        } = request.payload;

        return Model.User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (bcrypt.compareSync(password, user.password)) {

                let {
                    id,
                    email,
                    password
                } = request.payload;

                let token =  {token: jwt.sign({
                    email,
                    id,
                    username
                }, "JWT_KEY", {
                    algorithm: 'HS256',
                    expiresIn: '1h', 
                })}

                 token = JSON.stringify(token)
                
                return reply.response(token).code(200)
            } else {
                return Boom.unauthorized('invalid password');
            }
        })
    },
    userSignup: function (request, reply) {
        let {
            email,
            password
        } = request.payload;

        if (email == '' || password == '') {
            return Boom.badRequest('email and password is required');
        }

        return Model.User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != null) {
                return Boom.badRequest('email already taken');
            } else {

                // level 10 salt and encrypt
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                return Model.User.create({
                    email: email,
                    username: email,
                    password: hash
                }).then(user => {
                    return reply.response(user).code(201)
                })
            }
        })

    },
    allUsers: function (request, reply) {
        return Model.User.findAll().then(user => {
            return reply.response(user).code(201)
        })
    }

}