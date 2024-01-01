const asyncHandeler = require('express-async-handler');
const Configs = require('../../../../Models/Configs');

exports.getConfigs = asyncHandeler(async (req, res, next) => {
    const config = await Configs.findOne();
    res.json({ configs: config });
});