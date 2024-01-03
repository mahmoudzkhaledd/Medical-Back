const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;
const { cloudinary } = require('../../../../services/Cloudinary/UploadImage');

const Image = require('../../../../Models/Image');
const { decrement } = require('../../../../Models/Counter');
/*
    400: car not found.
    401: there are rents depends on this car, please wait until the rent ends and try again.
    410: failed to delete car image from the server.
*/
exports.deleteService = asyncHandeler(
    async (req, res, next) => {

        const serviceId = req.params.id;
        if (!ObjectId.isValid(serviceId)) {
            return res.sendStatus(400);
        }

        const service = await Service.findById(serviceId)
            .populate([
                {
                    path: 'thumbnailImage',
                },

            ]);
        if (service == null) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على الخدمة المراد حذفها" })
        }
        if (service.active == false) {
            service.active = true;
            await service.save();
            return res.sendStatus(200);
        }
        const dependOrdersCount = await Order.findOne({
            serviceId: serviceId,
            $and: [
                {
                    status: {
                        $ne: "canceled"
                    },
                },
                {
                    status: {
                        $ne: "refused"
                    },
                },
                {
                    status: {
                        $ne: "done"
                    },
                },
            ],
        });
        if (dependOrdersCount != null) {
            return res.status(404).json({ msg: "هناك طلبات قائمة تعتمد على هذه الخدمة." })
        }
        if (service.thumbnailImage != null) {
            const r1 = await cloudinary.uploader.destroy(service.thumbnailImage.public_id);
            if (r1.result != 'ok') {
                return res.status(405).json({ msg: "يوجد مشكلة بحذف الصورة الرجاء المحاولة مرة اخرى" })
            }
            const r2 = await cloudinary.api.delete_folder(`services/${service._id}`);
            console.log({ r1, r2 });
            await Image.deleteOne({
                _id: service.thumbnailImage._id,
            });
            service.thumbnailImage = null;
        }

        await service.deleteOne();
        await decrement('services');

        res.sendStatus(200);
    }
)