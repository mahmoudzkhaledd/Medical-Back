const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const unProtectedRoutes = [
    '/login',
    '/login/token',
    '/signup',
    '/services/most-visited',
    '/configs',
];

function matchRoute(incomingRoute) {
    for (const route of unProtectedRoutes) {
        const regexRoute = new RegExp('^' + route.replace(/:[a-zA-Z0-9]+/g, '([a-zA-Z0-9]+)') + '$');
        if (regexRoute.test(incomingRoute)) {
            return true;
        }
    }
    return false;
}



exports.userValidatorMiddleware = async (req, res, next) => {

    try {
        const token = (req.headers.token).split(' ')[1].trim();

        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(userModel.id);
        const emailVer = (!matchRoute(req.originalUrl) && !user.verifiedEmail && req.originalUrl != '/verify-account');
        if (user == null || user.banned || emailVer) {
            return res.sendStatus(403);
        } else {
            res.locals.userModel = user;
            return next();
        }
    } catch (err) {
        if (matchRoute(req.originalUrl)) {
            return next();
        }
        return res.status(455).json({ "message": "Unauthorized !" });
    }
}

