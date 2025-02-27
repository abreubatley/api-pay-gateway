require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.FALLBACK_URL || "http://localhost";

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`running on ${url}:${port}`);
});