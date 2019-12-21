"use strict";

const db = require("../../db/db");
const Boom = require('boom')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const JWT_KEY = process.env.JWT_KEY

// const user = model({
//     name: "users",
//     tableName: "tbl_users",
//    });

module.exports = {
    login: function (request, reply) {
        let {
            email,
            password
        } = request.payload;

        return db('users').where({
                email: email
        }).then(user => {
             user = user[0]
            if (bcrypt.compareSync(password, user.password)) {
                let {
                    id,
                    email,
                    username
                } = user;

                let token =  {token: jwt.sign({
                    email,
                    id,
                    username
                }, JWT_KEY, {
                    algorithm: 'HS256',
                    expiresIn: '24h',
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

        return db('users').where({
                email: email
        }).then(user => {

            if (!user && !user[0]) {
                return Boom.badRequest('email already taken');
            } else {

                // level 10 salt and encrypt
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                return db('users').insert({
                    email: email,
                    username: email,
                    password: hash
                }).then(user => {
                    return reply.response(JSON.stringify(user[0])).code(201)
                })
            }
        })

    },
    allUsers: function (request, reply) {
        return db('users').select().then(user => {
            return reply.response(JSON.stringify(user)).code(201)
        })
    }

}
