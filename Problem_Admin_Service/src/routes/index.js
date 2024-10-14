const express = require('express');

const v1Router = require('./v1/index.js');

const apiRouter = express.Router();

// If any req comes and continues with /api, we map it to v1Router
apiRouter.use('/v1', v1Router);

module.exports = apiRouter;