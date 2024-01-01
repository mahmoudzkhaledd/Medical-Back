const appRoute = require('express').Router();
const { changeAccountSettings } = require('./Services/ChangeAccountSettings');
const { resetPassword } = require('./Services/ResetPassword');
const { accountSettingsValidator,resetPasswordValidator } = require('./Validator/UserValidator')
appRoute.post('/update-account', accountSettingsValidator, changeAccountSettings);
appRoute.post('/reset-password', resetPasswordValidator, resetPassword);
module.exports = appRoute;