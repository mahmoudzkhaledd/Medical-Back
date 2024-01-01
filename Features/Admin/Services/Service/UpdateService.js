const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const Image = require('../../../../Models/Image');
const { uploadImage } = require('../../../../services/Cloudinary/UploadImage');
const ObjectId = require('mongoose').Types.ObjectId;
exports.updateService = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;
        const serviceId = req.params.id;
        if (!ObjectId.isValid(serviceId)) {
            return res.sendStatus(400);
        }
        let {
            name,
            price,
            category,
            thumbnailImage,
            description,
            subDescription,
        } = req.body;

        const service = await Service.findOne({
            _id: serviceId,
        });
        if (service == null) return res.sendStatus(404);
        let updatedImage = null;
        if (thumbnailImage != null && thumbnailImage != "" && service.thumbnailImage == null) {
            const result = await uploadImage(thumbnailImage, service._id);
            updatedImage = await Image.create({
                type: "thumbnail",
                adminId: adminModel._id,
                serviceId: service._id,
                ...result.data,
            });
        }
        const serviceUpdated = await service.updateOne({
            name,
            price,
            category,
            description,
            subDescription,
            thumbnailImage: updatedImage != null ? updatedImage._id : service.thumbnailImage,
        });
        res.status(serviceUpdated.modifiedCount != 0 ? 200 : 400)
        .json({
            service: service,
        });
    }
)