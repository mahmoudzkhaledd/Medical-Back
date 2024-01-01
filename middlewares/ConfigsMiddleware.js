const Config = require('../Models/Configs');
exports.configsValidator = async (req, res, next) => {
    const configs = await Config.findOne();
    if (configs == null) return next();
    if (!configs.available) return res.status(501).json({ message: configs.closedMessage });
    next();
}