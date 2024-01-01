const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
exports.getServices = asyncHandeler(
    async (req, res, next) => {
        let page = req.query.page || 0;
        if(page < 0) page = 0;
        const search = req.query.search || "";

        const regex = new RegExp(`^${search}`, 'i');
        const query = {
            name: {
                $regex: regex,
            },
            active: true,
        };
        const count = await Service.count(query);
        const services = await Service.find(query, { adminId: 0, })
            .skip(page * 10)
            .limit(10).populate([
                {
                    path: 'thumbnailImage',
                    select: { _id: 1, url: 1 },
                },
            ]);
        res.status(200).json({ services, count });
    }
)