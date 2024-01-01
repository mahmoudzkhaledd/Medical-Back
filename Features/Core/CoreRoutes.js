const appRouter = require('express').Router();
const servicesRoutes = require('./Services/ServicesRoutes');
const orderRoutes = require('./Orders/OrdersRoutes');
appRouter.use('/services', servicesRoutes);
appRouter.use('/', orderRoutes);

module.exports = appRouter;  