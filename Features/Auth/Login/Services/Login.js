const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Configs = require('../../../../Models/Configs');

exports.loginUser = asyncHandeler(async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    const userModel = res.locals.userModel;
    if (userModel != null) {
        user = userModel;
    } else {
        user = await User.findOne({ email: email });
    }

    if (user == null) return res.status(401)
        .json({ msg: 'يرجى التحقق من الايميل او الباسورد الخاص بك' });
    if (user.banned) return res.status(403)
        .json({ msg: "تم حظر الحساب الخاص بك" });
    if (userModel == null) {
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401)
            .json({ msg: 'يرجى التحقق من الايميل او الباسورد الخاص بك'});
    }
    user.password = null;
    const tokenModel = {
        "id": user._id,
        "verifiedEmail": user.verifiedEmail,
    };
    let token = null; 
    if (userModel == null) {
        token = await jwt.sign(tokenModel, process.env.ACCESS_TOKEN_KEY);
    }
    

    // if (!user.verifiedEmail) {
    //     return res.status(200).json({
    //         msg: "لم يتم تفعيل الايميل",
    //         user,
    //         token,
    //     });
    // }
    
    const config = await Configs.findById('655df5c5d487f045753e4e1c');
    return res.status(200).json({
        user,
        token,
        configs: config,
    });
});

