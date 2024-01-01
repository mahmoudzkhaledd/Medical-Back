const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');

exports.getUserOrders = asyncHandeler(
    async (req, res, next) => {
        let page = req.query.page || 0;
        if(page < 0) page = 0;
        const userModel = res.locals.userModel;
        const orders = await Order.find({
            userId: userModel._id,
        }).skip(page * 10).limit(10).populate('serviceId', { name: 1 });
        res.status(200).json({ orders });
    } 
)