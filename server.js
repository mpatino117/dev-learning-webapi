'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const models = require('./models');
const log = require('torch')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

const initDb = function (cb) {
    let sequelize = models.sequelize;
    if (sequelize.getDialect() === 'postgres' &&
        (!sequelize.options.storage || sequelize.options.storage === ':memory:')) {} else {
        cb();
    }
};

server.route(routes)

const init = async () => {

    const validate = async function (decoded, request) {
        const Users = Model.Users.findAll();
        if (!Users[decoded.id]) {
            return {
                isValid: false
            };
        } else {
            return {
                isValid: true
            };
        }
    };

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        key:privateKey,
        validate: validate,
        verifyOptions: {
            algorithms: ['HS256']
        } 
    });

    await server.start();

    log.green(`Server running at: ${server.info.uri}`);
};

init();

module.exports = server;