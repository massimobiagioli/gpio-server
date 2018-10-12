require('dotenv').config();
const express = require('express');
const winston = require('winston');
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || info,
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});
const app = express();
const port = process.env.PORT
const machineHandler = require('./lib/machine-handler').create({
    'loopInterval': 200
}, logger);
const api = require('./routes/api').create(express, machineHandler);

app.use('/api', api);

app.listen(port, () => {
    logger.info(`Server listen on port ${port}!`);
});

machineHandler.start();
process.on('SIGINT', machineHandler.shutdown);