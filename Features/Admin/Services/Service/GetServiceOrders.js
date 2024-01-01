const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getServiceOrders = asyncHandeler(
    async (req, res, next) => {
        const serviceId = req.params.id;
        let page = Number(req.query.page) || 0;
        if(page < 1) page = 1;
        if (serviceId == null || !ObjectId.isValid(serviceId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        const count = await Order.count({
            serviceId: serviceId,
        });
        const orders = await Order.find({
            serviceId: serviceId,
        }).skip((page - 1) * 10).limit(10).populate([
            {
                path: 'serviceId',
                select: { name: 1 },
            },
        ]);;


        res.status(200).json({ orders, count });
    }
)