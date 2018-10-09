require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT

app.get('/ping', (req, res) => {
    currentState = 'changeCircuit';
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server listen on port ${port}!`);
});

// Init state
const flowStates = [
    {
        name: 'init'
    },
    {
        name: 'changeCircuit'
    },
    {
        name: 'end'
    }
];

const currentState = 'init';

// Loop
const flowInterval = setInterval(() => {

    switch (currentState) {
        case 'init':            
            break;        
        case 'changeCircuit':
            console.log('state -> changeCircuit');            
            currentState = 'init';
            break;
    }

}, 500);

function shutdown() { 
    clearInterval(flowInterval);
};

process.on('SIGINT', shutdown);