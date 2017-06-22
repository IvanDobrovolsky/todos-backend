const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');

const numWorkers = require('os').cpus().length;
const path = require('path');
const app = express();
const SETTINGS = require('../settings');
const port = process.env.PORT || SETTINGS.defaultPort;
const apiRoutes = require('./api.router')(app, express);

if(cluster.isMaster) {
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    //Setting public directory for front end
    app.use(express.static(path.join(__dirname, '../src')));

    //Using bodyParser middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // API Routes
    app.use('/api', apiRoutes);

    app.listen(port, error => {
        if (error) {
            console.error(error);
        } else {
            console.info(`The server is running on port: ${port}. Handled by ${process.pid} process`);
        }
    });
}
