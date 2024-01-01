const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getOrder = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.sendStatus(400);
        }
        const order = await Order.findOne({
            userId: userModel._id,
            _id: orderId,
        }).populate('serviceId', { name: 1, price: 1 });
        if (order == null) {
            return res.sendStatus(400);
        }
        await order.populate("serviceId.thumbnailImage", { _id: 1, url: 1 });

        res.status(200).json({ order });
    }
)