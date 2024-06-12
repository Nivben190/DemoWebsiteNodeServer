import ErrorType from "../../errors/Errors";

 function checkPasswordLength(password: string): boolean {
    return password.length > 5 && password.length < 21;
}

 function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



export function validate(email: string, password: string): ErrorType | null{
    if(!email || !password){
        return ErrorType.DidntEnterEmailOrPassword;
    }
    if(!checkPasswordLength(password)){
        return ErrorType.InvalidPassword;
    }
    if(!validateEmail(email)){
        return ErrorType.InvalidEmail;
    }
    return null;
}