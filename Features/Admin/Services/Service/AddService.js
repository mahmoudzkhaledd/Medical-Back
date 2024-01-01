const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const Image = require('../../../../Models/Image');
const { uploadImage } = require('../../../../services/Cloudinary/UploadImage');
exports.addNewService = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;
        let {
            name,
            price,
            category,
            thumbnailImage,
            description,
            subDescription,
        } = req.body;
        const service = await Service.create({
            adminId: adminModel.id,
            name,
            price,
            category,
            thumbnailImage: null,
            description,
            subDescription,
        });
        if (thumbnailImage != null && thumbnailImage != "") {
            const result = await uploadImage(thumbnailImage, service._id);
            
            thumbnailImage = null;
            if (result.data != null) {
                const img = await Image.create({
                    ...result.data,
                    adminId: adminModel.id,
                    type: "thumbnail",
                    serviceId: service._id,
                });
                
                await service.updateOne({
                    thumbnailImage: img._id,
                });
            } else {
                thumbnailImage = null;
            }
        }
        res.status(200).json({ service });
        // try {
            
        // } catch (err) {
        //     if (err.code == 11000) {
        //         return res.sendStatus(400);
        //     }
        //     return res.status(410).json({
        //         msg: err.message,
        //     });
        // }

    }
)