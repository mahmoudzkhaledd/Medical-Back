const { check } = require('express-validator');
const validator = require('../../../../middlewares/validatorMiddleware');

module.exports.signupValidator = [
    check('name').isLength({ min: 3, max: 200 }).withMessage("first name must be between 3 and 32 characters"),
    check('email').isEmail().withMessage("please enter valid email"),
    check('password').isLength({ min: 8, max: 200 }).withMessage("password name must be between 8 and 200 characters"),
    check('phone').isLength({ min: 11, max: 15 }).withMessage("phone must be between 11 and 15 characters"),
    check('gender').isBoolean().withMessage("User gender must be provided"),

    validator
];