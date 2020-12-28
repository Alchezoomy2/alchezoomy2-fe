const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    console.log('HI!');
    res.send('AHHHHHHH!')
})

module.exports = app;