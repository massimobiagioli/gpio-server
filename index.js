require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server listen on port ${port}!`);
});