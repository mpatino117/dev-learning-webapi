'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const models = require('./models');
const log = require('torch')
const {
    configureAuth
} = require('./plugins/auth')
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


const init = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    await server.route(routes)

    await configureAuth(server)

    await server.start();

    log.green(`Server running at: ${server.info.uri}`);
};

init();

module.exports = server;