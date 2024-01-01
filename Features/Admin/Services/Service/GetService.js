const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const ObjectId = require('mongoose').Types.ObjectId;
exports.getService = asyncHandeler(
    async (req, res, next) => {
        const serviceId = req.params.id;
        if (serviceId == null || !ObjectId.isValid(serviceId)) {
            return res.sendStatus(400);
        }
        const service = await Service.findById(serviceId).populate([
            {
                path: "thumbnailImage",
                select: { url: 1 },
            },
            {
                path: "adminId",
                select: { name: 1 },
            },
        ]);
        if (service == null) {
            return res.sendStatus(400);
        }
        return res.status(200).json({ service });
    }
)