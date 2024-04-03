import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData";
import { EncryptRequestData } from "../Utils/Encryption/EncryptRequestData";
import { decryptFromJson, encryptToJson } from "../Utils/functions";

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


        let json = await response.json();
        json = DecryptResponseData(json)


        console.log('The response is of Signup fetch is ', json)

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

    console.log('The data in verifyEmail is ', data)
    const DATA  = {payload:data}
    try {

        const response = await fetch(BASE_URL+"/auth/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = DecryptResponseData(await response.json());

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

        // const encryptedData = encryptToJson(data);
        // const DATA  = {payload:encryptedData}
        const DATA = EncryptRequestData(data)

        const response = await fetch(BASE_URL+"/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = DecryptResponseData(await response.json());

        console.log('The received json data in signin :',json)
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
        // const encryptedData = encryptToJson(data);
        // const DATA  = {payload:encryptedData}
        const DATA = EncryptRequestData(data)

        const response = await fetch(BASE_URL+"/auth/forgotpasswordrequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = DecryptResponseData(await response.json());

        return json;

    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


export const changePassword = async (data) => {

    try{

        // const encryptedData = encryptToJson(data);
        // const DATA  = {payload:encryptedData}
        const DATA = EncryptRequestData(data)

        const response = await fetch(BASE_URL+"/auth/resetpassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            },
            body: JSON.stringify(DATA),
        });

        const json = DecryptResponseData(await response.json());

        return json;
        
    }catch(err){
        return { success: false, msg: err.toString() }
    }
}

export const logOut = async () => {

    try{

        const response = await fetch("http://localhost:5000/auth/google/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key
            }
        });

        const json = await response.json();

        return json;

    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


