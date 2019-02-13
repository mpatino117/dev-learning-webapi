"use strict";

const Model = require('../models');
const Boom = require('boom')
const bcrypt = require('bcrypt');

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
                return reply.response(user).code(200)
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