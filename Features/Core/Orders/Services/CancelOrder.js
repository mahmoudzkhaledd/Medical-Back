const Order = require('../../../../Models/Order');
const Service = require('../../../../Models/Service');
const { decrement, increment } = require('../../../../Models/Counter');
const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandeler = require('express-async-handler');
exports.cancelOrder = asyncHandeler(
    async (req, res, next) => {
        const orderId = req.params.id;
        const userModel = res.locals.userModel;



        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOne({
            _id: orderId,
            userId: userModel._id,
        },);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        if (order.status != 'canceled') {
            await Service.updateOne({ _id: order.serviceId }, {
                $inc: {
                    pendingOrders: -1,
                },
            });
            order.status = 'canceled';
        } else {
            await Service.updateOne({ _id: order.serviceId }, {
                $inc: {
                    pendingOrders: 1,
                },
            });
            order.status = 'pending';
        }
        await order.save();
        res.status(200).json({msg:"تمت العملية بنجاح"});
    }
)