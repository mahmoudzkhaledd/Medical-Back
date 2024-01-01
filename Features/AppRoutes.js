const appRoute = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const coreRoutes = require('./Core/CoreRoutes');
const adminRoutes = require('./Admin/AdminRoutes');
const userRoutes = require('./User/UserRoutes');
const { userValidatorMiddleware } = require('../middlewares/UserValidatorMiddleware');
const { adminValidatorMiddleware } = require('../middlewares/AdminValidator');
const { configsValidator } = require('../middlewares/ConfigsMiddleware');



appRoute.use("/admin", adminValidatorMiddleware, adminRoutes);

appRoute.use(configsValidator);
appRoute.use(userValidatorMiddleware);
appRoute.use(userRoutes);
appRoute.use(coreRoutes);
appRoute.use(authRoutes);
appRoute.all('*', (req, res) => {
    res.status(404).json({ msg: "Can't find this route" });
});

module.exports = appRoute;