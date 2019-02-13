"use strict";

let Model = require('../models');
let log = require('torch')
let hashPassword = require('../plugins/authentication')
let Boom = require('boom')
const bcrypt = require('bcrypt');



module.exports = {
    get: function (request, reply) {
        return Model.User.findAll()
    },
    post: function (request, reply) {
        return Model.User.create(request.payload)
    },
    signUp: function (request, reply) {
        let {email, password} = request.payload;

        // level 10 salt and encrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // var user = Model.User.findOne({where:{email: email}}).then(e => {return e})
           

        //     log.yellow(user.then(rt => {
        //         console.log(rt)
        //     }
        //     ))
                return Model.User.create({
                    email: email,
                    username: email,
                    password: hash
                }).then(user => {
                    return h.response(user).code(201)
                })
           



    },
    signIn: function (request, reply) {

    }

}