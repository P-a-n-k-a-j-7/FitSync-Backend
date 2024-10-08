const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', userRoutes);
module.exports = app;