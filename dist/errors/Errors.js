"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorType;
(function (ErrorType) {
    ErrorType["BadRequest"] = "Your request is invalid, please check your parameters and try again";
    ErrorType["Unauthorized"] = "You Are Not Authorized To Access This Resource";
    ErrorType["UserNotFound"] = "User Not Found , Please Register";
    ErrorType["InternalServerError"] = "Something went wrong, Please try again later";
})(ErrorType || (ErrorType = {}));
exports.default = ErrorType;
