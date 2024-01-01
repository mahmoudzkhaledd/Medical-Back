const appRouter = require('express').Router();
const { getOrder } = require('./Services/GetOrder');
const { getOrders } = require('./Services/GetOrders');
const { changeOrderState } = require('./Services/ChangeOrderState');
const { changeOrderStateValidator } = require('./Validator/ChangeOrderStateValidator');
const rolesValidator = require('../../../middlewares/RolesValidator');
const { deleteOrder } = require('./Services/DeleteOrder');
const { getAdminsResponsable } = require('./Services/GetAdminsResponsable');
const { addResponsableAdmin } = require('./Services/AddResponsableAdmin');
const { deleteResponsableAdmin } = require('./Services/DeleteResponsableAdmin');

appRouter.route('/orders/:id')
    .get(rolesValidator(["SeeSingleOrder"]), getOrder);


appRouter.route('/orders/:id/change-state')
    .post(rolesValidator(["ChangeOrderState"]), changeOrderStateValidator, changeOrderState);


appRouter.route('/orders')
    .get(rolesValidator(["SeeAllOrders"]), getOrders);

appRouter.route('/orders/:id/delete')
    .delete(rolesValidator(["DeleteOrder"]), deleteOrder);


appRouter.get('/orders/:id/admins', rolesValidator(["AddResponsableAdmin", 'DeleteResponsableAdmin']), getAdminsResponsable);


appRouter.post('/orders/:id/admins', rolesValidator(["AddResponsableAdmin"]), addResponsableAdmin);


appRouter.delete('/orders/:id/admins/:adminId', rolesValidator(["DeleteResponsableAdmin"]), deleteResponsableAdmin);


module.exports = appRouter;  