enum ErrorType {
    DidntEnterEmailOrPassword = 'Please Enter Email and Password',
    InvalidEmail = 'Invalid Email',
    InvalidPassword = 'Password must be between 6 and 20 characters',
    BadRequest = 'Your request is invalid, please check your parameters and try again',
    Unauthorized = 'You Are Not Authorized To Access This Resource',
    UserNotFound = 'User Not Found , Please Register',
    InternalServerError = 'Something went wrong, Please try again later',
}

export default ErrorType;