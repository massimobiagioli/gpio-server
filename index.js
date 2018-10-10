require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const machineHandler = require('./lib/machine-handler').create({
    'loopInterval': 200
});

app.get('/ping', (req, res) => {
    currentState = 'changeCircuit';
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server listen on port ${port}!`);
});

machineHandler.start();
process.on('SIGINT', machineHandler.shutdown);