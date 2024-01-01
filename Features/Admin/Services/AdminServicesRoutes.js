const appRouter = require('express').Router();
const { addNewService } = require('./Service/AddService');
const { updateService } = require('./Service/UpdateService');
const { getServices } = require("./Service/GetServices");
const { getService } = require("./Service/GetService");
const { deleteService } = require("./Service/DeleteService");
const { disableService } = require("./Service/DisableService");
const { deleteImage } = require("./Service/DeleteImage");
const adminRolesValidator = require('../../../middlewares/RolesValidator');
const { getServiceOrders } = require('./Service/GetServiceOrders');


appRouter.post('/', adminRolesValidator(['AddNewService']), addNewService);
appRouter.get('/', adminRolesValidator(['GetAllServices']), getServices);
appRouter.route('/:id')
    .get(adminRolesValidator(['GetSingleService']), getService)
    .delete(adminRolesValidator(['ShowHideService']), disableService)
    .put(adminRolesValidator(['UpdateService']), updateService);
appRouter.delete('/:id/delete-image', adminRolesValidator(['UpdateService']), deleteImage);
appRouter.delete('/:id/delete', adminRolesValidator(['DeleteService']), deleteService);
appRouter.get('/:id/orders', adminRolesValidator(['SeeServiceOrders']), getServiceOrders);

module.exports = appRouter;  