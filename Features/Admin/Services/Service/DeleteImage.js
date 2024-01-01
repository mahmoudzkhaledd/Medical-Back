const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const Image = require('../../../../Models/Image');
const ObjectId = require('mongoose').Types.ObjectId;
const { cloudinary } = require('../../../../services/Cloudinary/UploadImage');



exports.deleteImage = asyncHandeler(
    async (req, res, next) => {
        const serviceId = req.params.id;
        if (serviceId == null || !ObjectId.isValid(serviceId)) {
            return res.sendStatus(400);
        }
        const service = await Service.findById(serviceId);
        if (service == null || service.thumbnailImage == null) {
            return res.sendStatus(400);
        }

        const image = await Image.findOne({
            _id: service.thumbnailImage,
        });

        if (image == null) return res.sendStatus(400);

        try {
            const result = await cloudinary.uploader.destroy(image.public_id);
            await cloudinary.api.delete_folder(`services/${service._id}`);
            if (result.result != 'ok') {
                return res.sendStatus(405);
            }
            await service.updateOne({
                thumbnailImage: null,
            })
            await image.deleteOne();
        } catch (ex) {}
        res.sendStatus(200);
    }
)