const asyncHandeler = require('express-async-handler');
const User = require('../../../Models/User');

exports.changeAccountSettings = asyncHandeler(async (req, res, next) => {
    const { address, city, street, phone } = req.body;
    const userModel = res.locals.userModel;

    const ans = await userModel.updateOne({ address, city, street, phone });
    res.sendStatus(ans.modifiedCount != 0 ? 200 : 400);
});