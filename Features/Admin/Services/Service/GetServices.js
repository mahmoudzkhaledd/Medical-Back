const asyncHandeler = require('express-async-handler');
const Service = require('../../../../Models/Service');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getServices = asyncHandeler(
    async (req, res, next) => {
        let page = Number(req.query.page) || 0;
        if(page < 0) page = 0;
        const search = req.query.search || "";
        const state = req.query.state || "all";

        const regex = new RegExp(`^${search}`, 'i');
        const query = {
            $or: [
                {
                    name: {
                        $regex: regex,
                    },
                },
                {
                    number: Number(search) || -1,
                },
                {
                    category: regex,
                },
            ],
        };
        if (state == 'active') {
            query.active = true;
        } else if (state == "canceled") {
            query.active = false;
        }
        if (ObjectId.isValid(search)) {
            if (query['$or']) {
                query['$or'].push({
                    _id: search,
                })
            } else {
                query['$or'] = [{
                    _id: search,
                }]
            }

        }
        const count = await await Service.count(query);
        const services = await Service.find(query).skip((page < 0 ? 0 : page) * 10).limit(10).sort('number');
        res.status(200).json({ services, count: count });
    }
)