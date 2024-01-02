const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.validatorOrderService = [
    check('notes').isString().isLength({ min: 0, max: 2000 })
    .withMessage("notes must be between 0 and 2000 characters")
        .optional(),
    
    validator,
];