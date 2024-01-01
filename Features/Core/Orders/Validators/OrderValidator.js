const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.validatorOrderService = [
    check('notes').isString().isLength({ min: 0, max: 200 }).withMessage("notes must be between 0 and 200 characters")
        .optional(),
    
    validator,
];