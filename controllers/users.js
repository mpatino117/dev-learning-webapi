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
    signUp: function (request, h) {
        let {email, password} = request.payload;

        // level 10 salt and encrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Model.User.find({where:{email: email}})
        //     .then(function (u) {
        //         log.yellow(u)
        //         if(u){
        //             return Boom.badData("Email address already in use!")
        //         }
        //     });


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