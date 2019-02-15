'use strict';

const Hapi = require('hapi');
const log = require('torch')

// sets enviroment variables
require('dotenv').config()

const routes = require('./routes');
const {configureAuth} = require('./plugins/auth')

const server = Hapi.server({
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOST ||'localhost',
    routes: {
        cors: {
          credentials: false
        }
      }
});


const init = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    
    await configureAuth(server)

    await server.route(routes)

    await server.start();

    log.green(`Server running at: ${server.info.uri}`);
};

init();

module.exports = server;