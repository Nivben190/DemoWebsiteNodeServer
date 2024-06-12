"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorType;
(function (ErrorType) {
    ErrorType["DidntEnterEmailOrPassword"] = "Please Enter Email and Password";
    ErrorType["InvalidEmail"] = "Invalid Email";
    ErrorType["InvalidPassword"] = "Password must be between 6 and 20 characters";
    ErrorType["BadRequest"] = "Your request is invalid, please check your parameters and try again";
    ErrorType["Unauthorized"] = "You Are Not Authorized To Access This Resource";
    ErrorType["UserNotFound"] = "User Not Found , Please Register";
    ErrorType["InternalServerError"] = "Something went wrong, Please try again later";
})(ErrorType || (ErrorType = {}));
exports.default = ErrorType;
