import { encryptToJson } from "../Utils/functions";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Signup = async (data) => {

    
    try {
        
        const encryptedData = encryptToJson(data);
    
        const DATA  = {payload:encryptedData}

        const response = await fetch(BASE_URL+"/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });


        const json = await response.json();

        if (json.success) {

            return { success: true, data: json };
        }

        else{
            return { success: false, msg:json.msg }
        }

    } catch (err) {
        return { success: false, msg: err.toString() }
    }
}


export const verifyEmail = async (data) => {

  

    try {
        const response = await fetch(BASE_URL+"/auth/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();

        if (json.success) {

            return { success: true, data: json };
        }

        else{
            return { success: false, msg:json.msg }
        }

    } catch (err) {
        return { success: false, err: err.toString() }
    }
}


export const Signin = async (data) => {

    try {

        const encryptedData = encryptToJson(data);
        const DATA  = {payload:encryptedData}

        const response = await fetch(BASE_URL+"/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = await response.json();

        if (json.success) {

            return { success: true, unique:json.unique, encryptedData:json.encryptedData };
        }

        else{
            return { success: false, msg:json.msg };
        }
    } catch (err) {
        return { success: false, msg: err.toString() }
    }
}

export const changePasswordRequest = async (data) => {
    try{
        const encryptedData = encryptToJson(data);
        const DATA  = {payload:encryptedData}

        const response = await fetch(BASE_URL+"/auth/forgotpasswordrequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = await response.json();

        return json;

    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


export const changePassword = async (data) => {

    try{

        const encryptedData = encryptToJson(data);
        const DATA  = {payload:encryptedData}

        const response = await fetch(BASE_URL+"/auth/resetpassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = await response.json();

        return json;
        
    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


