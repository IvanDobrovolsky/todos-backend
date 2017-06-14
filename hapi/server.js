const Hapi = require('hapi');
const SETTINGS = require('../settings');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: process.env.PORT || SETTINGS.defaultPort
});

// Including routes
require('./api.router')(server);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});