const appRouter = require('express').Router();
const serviceRouter = require('./Services/AdminServicesRoutes');
const authRoutes = require('./Auth/AuthRoutes');
const statRouters = require('./Statistics/StatisticsRoutes');
const orderRouters = require('./Orders/OrdersRoutes');
const usersRouters = require('./Users/UsersRoute');
const adminsRoutes = require('./Admins/AdminsRoutes');
const configsRoutes = require('./Configs/ConfigsRoutes');


appRouter.use("/configs", configsRoutes);
appRouter.use(authRoutes);
appRouter.use("/admins", adminsRoutes);
appRouter.use(orderRouters);
appRouter.use("/users", usersRouters);
appRouter.use(statRouters);
appRouter.use("/services", serviceRouter);
module.exports = appRouter;  