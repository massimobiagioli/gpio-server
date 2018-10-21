require('dotenv').config();
const nodemon = require('nodemon');
const express = require('express');
const logger = require('./lib/logger');
const app = express();
const port = process.env.PORT
const machineHandler = require('./lib/machine-handler').create({
    'loopInterval': 200
});
const apiRoutes = require('./routes/api').create(express, machineHandler);
const adminRoutes = require('./routes/admin').create(express);

// Init routes
app.use('/api', apiRoutes);
app.use('/', adminRoutes);

// Init middlewares
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// Start server
app.listen(port, () => {
    logger.info(`Server listen on port ${port}!`);
});

// Init cycle
machineHandler.start();

// Handle process events
process

    // Handle normal exits
    .on('exit', (code) => {
        nodemon.emit('quit');
        process.exit(code);
    })

    // Handle CTRL+C
    .on('SIGINT', () => {
        machineHandler.shutdown;
        nodemon.emit('quit');
        process.exit(0);
    });
