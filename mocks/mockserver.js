require('dotenv').config();
const express = require('express');
const mocks = require('./mocks.config.js');

const app = express();
const url = process.env.MOCK_URL || "http://localhost";
const port = process.env.MOCK_PORT || 8080;

app.use(express.json());

mocks.forEach(mock => {
    app[mock.method.toLowerCase()](mock.url, mock.response);
});

app.listen(port, () => {
    console.log(`running on ${url}`);
});