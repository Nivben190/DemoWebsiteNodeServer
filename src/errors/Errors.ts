enum ErrorType {
    BadRequest = 'Your request is invalid, please check your parameters and try again',
    Unauthorized = 'You Are Not Authorized To Access This Resource',
    UserNotFound = 'User Not Found , Please Register',
    InternalServerError = 'Something went wrong, Please try again later',
}

export default ErrorType;