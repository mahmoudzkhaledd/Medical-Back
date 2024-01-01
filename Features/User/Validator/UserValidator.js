const validator = require('../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.accountSettingsValidator = [
    check('address').isString().isLength({ min: 0, max: 200 })
        .withMessage("يجب أن يكون العنوان بين 3 احرف و 200 حرف").optional(),
    check('city').isString().isLength({ min: 0, max: 100 })
        .withMessage("يجب أن تكون المدينة بين 3 احرف و 200 حرف").optional(),
    check('street').isString().isLength({ min: 0, max: 100 })
        .withMessage("يجب أن يكون الشارع بين 3 احرف و 200 حرف").optional(),
    check('phone').isString().isLength({ min: 0, max: 15 })
        .withMessage("يجب أن يكون رقم الهاتف بين 11 احرف و 15 حرف").optional(),
    check('email').not().exists(),
    validator,
];
module.exports.resetPasswordValidator = [
    check('oldPassword').isString().isLength({ min: 8, max: 200 })
        .withMessage("يجب أن يكون الباسورد بين 8 احرف و 200 حرف").optional(),
    check('newPassword').isString().isLength({ min: 8, max: 200 })
        .withMessage("يجب أن يكون الباسورد بين 8 احرف و 200 حرف").optional(),
    validator,
];