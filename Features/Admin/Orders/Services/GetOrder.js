const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getOrder = asyncHandeler(
    async (req, res, next) => {
      
        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOne({
            _id: orderId,
        }).populate([
            {
                path: 'userId',
                select: { name: 1, address: 1, city: 1, street: 1, number: 1, },
            },
            {
                path: 'serviceId',
                select: { name: 1, thumbnailImage: 1, },
            },
            {
                path: 'responsableAdmins',
                select: { name: 1, },
            },
        ]);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        await order.populate("serviceId.thumbnailImage", { _id: 1, url: 1 });

        res.status(200).json({ order });
    }
)