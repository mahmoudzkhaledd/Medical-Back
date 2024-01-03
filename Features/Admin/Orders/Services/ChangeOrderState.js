const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const Service = require('../../../../Models/Service');
const { decrement, increment } = require('../../../../Models/Counter');
const ObjectId = require('mongoose').Types.ObjectId;
const decreaseStates = [
    'refused',
    'done',
];
exports.changeOrderState = asyncHandeler(
    async (req, res, next) => {
        const orderId = req.params.id;
        const { status, dateSelected, refuseReason } = req.body;


        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOneAndUpdate({
            _id: orderId,
        }, {
            status,
            dateSelected: dateSelected != null ? `${dateSelected.toLocaleDateString()}`.split('T')[0] : null,
            refuseReason
        });
        if (!decreaseStates.includes(order.status) && decreaseStates.includes(status)) {
            await Service.updateOne({ _id: order.serviceId }, {
                $inc: {
                    pendingOrders: -1,
                },
            });

        } else if (decreaseStates.includes(order.status) && !decreaseStates.includes(status)) {
            await Service.updateOne({ _id: order.serviceId }, {
                $inc: {
                    pendingOrders: 1,
                },
            });

        }

        res.sendStatus(order.modifiedCount != 0 ? 200 : 400);
    }
)