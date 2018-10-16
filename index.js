require('dotenv').config();
const express = require('express');
const logger = require('./lib/logger');
const app = express();
const port = process.env.PORT
const machineHandler = require('./lib/machine-handler').create({
    'loopInterval': 200
});
const api = require('./routes/api').create(express, machineHandler);

// Init routes
app.use('/api', api);

// Start server
app.listen(port, () => {
    logger.info(`Server listen on port ${port}!`);
});

// Init cycle
machineHandler.start();
process.on('SIGINT', machineHandler.shutdown);