const appRouter = require('express').Router();
const { orderService } = require('./Services/OrderService');
const { validatorOrderService } = require('./Validators/OrderValidator');
const { getOrder } = require('./Services/GetOrder');
const { getUserOrders } = require('./Services/GetUserOrders');
const { cancelOrder } = require('./Services/CancelOrder');
const { updateOrder } = require('./Services/UpdateOrder');

appRouter.post('/services/:id/order', validatorOrderService, orderService);

appRouter.route('/orders/:id').get(getOrder);
appRouter.post('/orders/:id/cancel', cancelOrder);
appRouter.put('/orders/:id',validatorOrderService, updateOrder);
appRouter.route('/orders').get(getUserOrders);

module.exports = appRouter;  