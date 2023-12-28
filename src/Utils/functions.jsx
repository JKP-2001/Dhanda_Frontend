
export const scrollToTop = () => {
    window.scrollTo(0, 0);
};


export const isValidEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    return emailRegex.test(email);
};


export const isStrongPassword = (password) => {
    
    const hasUpperCase = /[A-Z]/.test(password);

    
    const hasSymbol = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);

    
    const hasNumber = /\d/.test(password);

    
    const hasMinLength = password.length >= 8;

    
    return hasUpperCase && hasSymbol && hasNumber && hasMinLength;
};


export const isValidName = (name) => {
    
    if (name.trim() === '') {
        return false;
    }

    
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
};


export const isValidOTP = (otp)=> {
    
    if (typeof otp !== 'string') {
        return false;
    }

    
    return /^\d{6}$/.test(otp);
}

