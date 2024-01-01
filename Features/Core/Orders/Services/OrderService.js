const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const Order = require('../../../../Models/Order');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;


exports.orderService = asyncHandeler(
    async (req, res, next) => {
        const serviceId = req.params.id;
        const userModel = res.locals.userModel;
        const user = userModel;

        if (serviceId == null || user == null || !ObjectId.isValid(serviceId)) {
            return res.sendStatus(400);
        }
        if (user.address == "" || user.city == "" || user.street == "") { 
            return res.status(400).json({msg:"يجب تحديث عنوانك اولا."});
        }
        if (!require('mongoose').Types.ObjectId.isValid(serviceId)) {
            return res.sendStatus(404);
        }
        const service = await Service.findOne({
            _id: serviceId,
        });
        if (service == null) {
            return res.sendStatus(404);
        }
        const { notes } = req.body;
        const order = await Order.create({
            userId: userModel._id,
            serviceId: service._id,
            notes: notes || "",
        });
        service.pendingOrders++;
        await service.save();
        res.status(200).json({ order });
    }
)