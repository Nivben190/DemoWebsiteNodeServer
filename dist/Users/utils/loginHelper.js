"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const Errors_1 = __importDefault(require("../../errors/Errors"));
function checkPasswordLength(password) {
    return password.length > 5 && password.length < 21;
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validate(email, password) {
    if (!email || !password) {
        return Errors_1.default.DidntEnterEmailOrPassword;
    }
    if (!checkPasswordLength(password)) {
        return Errors_1.default.InvalidPassword;
    }
    if (!validateEmail(email)) {
        return Errors_1.default.InvalidEmail;
    }
    return null;
}
exports.validate = validate;
