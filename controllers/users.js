let Model = require('../models')
let log = require('torch')

module.exports = {
    get: function (request, h) {
     return Model.User.findAll()
    },
    post: function (request, h) {
        return Model.User.create(request.payload)
    }
}