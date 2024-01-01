const { changeWebsiteAvailability } = require('./Services/ChangeWebsiteAvailability');
const { getConfigs } = require('./Services/GetConfigs');
const adminRolesValidator = require('../../../middlewares/RolesValidator');
const appRouter = require('express').Router();

appRouter.post('/change-available',adminRolesValidator(['ChangeWebAvailability']), changeWebsiteAvailability);
appRouter.get('/', getConfigs);
module.exports = appRouter;  