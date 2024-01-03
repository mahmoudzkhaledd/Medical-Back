const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');

exports.getUserOrders = asyncHandeler(
    async (req, res, next) => {
        let page = req.query.page || 0;
        if(page < 0) page = 0;
        const userModel = res.locals.userModel;
        const count = await Order.count({userId: userModel._id,});
        const orders = await Order.find({
            userId: userModel._id,
        },{responsableAdmins: 0,refuseReason: 0,dateSelected:0,status: 0,userId: 0,}).skip(page * 10).limit(10).populate('serviceId', { name: 1 });
        res.status(200).json({ orders,count });
    } 
)