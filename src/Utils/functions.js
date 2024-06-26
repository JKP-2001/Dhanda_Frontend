// const CryptoJS = require('crypto-js');
import CryptoJS from 'crypto-js'


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


export const getTimeDifference = (isoString) => {
  
  const pastDate = new Date(isoString);
  const currentDate = new Date();


  const timeDifference = currentDate - pastDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44)); 
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25)); 

 
  let timeUnit, timeValue;
  if (years >= 1) {
    timeUnit = 'year';
    timeValue = years;
  } else if (months >= 1) {
    timeUnit = 'month';
    timeValue = months;
  } else if (days >= 1) {
    timeUnit = 'day';
    timeValue = days;
  } else if (hours >= 1) {
    timeUnit = 'hour';
    timeValue = hours;
  } else if(minutes >= 1) {
    timeUnit = 'minute';
    timeValue = minutes;
  } else{
    timeUnit = 'second';
    timeValue = seconds+2;
  }


  return `${timeValue} ${timeUnit}${timeValue > 1 ? 's' : ''} ago`;
};


export const getDateDiffrence = (date1, date2) => {

  const [year1, month1, day1] = date1.split('-').map(Number);
  const [year2, month2, day2] = date2.split('-').map(Number);

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return {
      year: 0,
      month: 1,
    };
  }

  if(month1 === month2) {

    if(day1 > day2){
      return {
        year: year2-year1-1,
        month: 11,
      }
    }

    return {
      year: year2 - year1,
      month: 0,
    }
  }

  if(month2>month1){
    return({
      year: year2 - year1,
      month: month2 - month1
    })
  }

  if(month2<month1){
    return({
      year: year2 - year1 - 1,
      month: 12 - month1 + month2
    })
  }


  
}
