const appRouter = require('express').Router();
const servicesRoutes = require('./Services/ServicesRoutes');
const orderRoutes = require('./Orders/OrdersRoutes');
const { userValidatorMiddleware } = require('../../middlewares/UserValidatorMiddleware');
appRouter.use('/services', servicesRoutes);

appRouter.use('/', userValidatorMiddleware, orderRoutes);

module.exports = appRouter;  