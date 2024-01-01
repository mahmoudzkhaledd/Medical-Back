const appRouter = require('express').Router();

const { getService } = require('./Service/GetService');
const { getServices } = require('./Service/GetServices');
const { getMostVisitedServices } = require('./Service/GetMostVisitedServices');


appRouter.get('/:id', getService);
appRouter.get('/', getServices);
appRouter.get('/most-visited', getMostVisitedServices);

module.exports = appRouter;  