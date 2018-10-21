require('dotenv').config();
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
app.set('view engine', 'ejs');

// Start server
app.listen(port, () => {
    logger.info(`Server listen on port ${port}!`);
});

// Init cycle
machineHandler.start();
process.on('SIGINT', machineHandler.shutdown);