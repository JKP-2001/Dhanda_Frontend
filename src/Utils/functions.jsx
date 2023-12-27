
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
