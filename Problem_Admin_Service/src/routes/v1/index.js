const express = require('express');

const problemRouter = require('./problem.routes');

const v1Router = express.Router();

// If any req comes and continues with /api, we map it to problemRouter

v1Router.use('/problems', problemRouter);

module.exports = v1Router;