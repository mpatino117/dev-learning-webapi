"use strict";

let log = require('torch');
let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let config = require("../config/config.json").development

let sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        let model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});




sequelize
    .authenticate()
    .then(() => {
        log.green('Connection has been established successfully.');
    })
    .catch(err => {
        log.red('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;