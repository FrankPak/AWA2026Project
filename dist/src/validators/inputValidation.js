"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passValidator = exports.emailValidator = exports.usernameValidator = void 0;
const express_validator_1 = require("express-validator");
const usernameValidator = (username) => ((0, express_validator_1.body)(username).trim().escape().isLength({ min: 3, max: 25 }));
exports.usernameValidator = usernameValidator;
const emailValidator = (email) => ((0, express_validator_1.body)(email).trim().escape().isEmail());
exports.emailValidator = emailValidator;
const passValidator = (password) => ((0, express_validator_1.body)(password).trim().escape().isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1
}));
exports.passValidator = passValidator;
//# sourceMappingURL=inputValidation.js.map