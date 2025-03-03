require('dotenv').config();
const express = require('express');
const http = require('http');
const routes = require('./cmd/routes');

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.FALLBACK_URL || "http://localhost";

app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);

server.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`running on ${url}:${port}`);
    }
});

module.exports = server;