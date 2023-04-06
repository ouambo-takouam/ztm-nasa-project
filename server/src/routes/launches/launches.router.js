const { Router } = require('express');

const { httpGetAllLaunches } = require('./launches.controller');

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);

module.exports = launchesRouter;
