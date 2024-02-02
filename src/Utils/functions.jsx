const CryptoJS = require('crypto-js');

const key = process.env.REACT_APP_ENCRYPT_KEY;



export const scrollToTop = () => {
    window.scrollTo(0, 0);
};


export const isValidEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    return emailRegex.test(email);
};


export const validateUsername = (username) => {
    // Define minimum and maximum length
    const minLength = 3;
    const maxLength = 20;
  
    // Define allowed characters using a regular expression
    const allowedCharacters = /^[a-zA-Z0-9_-]+$/;
  
    // Check length
    if (username.length < minLength || username.length > maxLength) {
      return false;
    }
  
    // Check if it contains only allowed characters
    if (!allowedCharacters.test(username)) {
      return false;
    }
  
    // Check if it doesn't start or end with underscores or hyphens
    if (username.startsWith('_') || username.startsWith('-') ||
        username.endsWith('_') || username.endsWith('-')) {
      return false;
    }
  
    // Username is valid
    return true;
  }


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




/**
 * Encrypts the given data to a JSON string using the provided key.
 *
 * @param {any} data - The data to be encrypted
 * @param {string} key - The key to be used for encryption
 * @return {string} The encrypted JSON string
 */

export function encryptToJson(data) {
  try {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(data);

    // Encrypt the string using AES
    const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();

    return encrypted;

  } catch (error) {
    console.error("Error encrypting JSON:", error);
    return null;
  }
}

/**
 * Decrypts the given encrypted data using the provided key and returns the
 * decrypted JSON object. If decryption fails, it logs an error and returns
 * null.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted
 * @param {string} key - The key used for decryption
 * @return {object} The decrypted JSON object, or null if decryption fails
 */

export function decryptFromJson(encryptedData) {
  try {
    // Decrypt using AES
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // Parse JSON string
    const jsonData = JSON.parse(decrypted);

    return jsonData;
  } catch (error) {
    console.error("Error decrypting JSON:", error);
    return null;
  }
}



