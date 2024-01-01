const appRouter = require('express').Router();
const { getAllUsers } = require('./Services/GetAllUsers');
const { getUser } = require('./Services/GetUser');
const { banUser } = require('./Services/BanUser');
const { enterUserAccount } = require('./Services/EnterUserAccount');
const { activeUserAccount } = require('./Services/ActiveUserAccount');
const rolesValidator = require('../../../middlewares/RolesValidator');

appRouter.get('/', rolesValidator(["SeeAllUsers"]), getAllUsers)
appRouter.get('/:id', rolesValidator(["SeeSingleUser"]), getUser)
appRouter.post('/:id/ban', rolesValidator(["BanUnBanUser"]), banUser)
appRouter.post('/:id/enter-account', rolesValidator(["EnterUserAccount"]), enterUserAccount)
appRouter.post('/:id/active-account', rolesValidator(["ActiveUnActiveUserAccount"]), activeUserAccount)
module.exports = appRouter;  