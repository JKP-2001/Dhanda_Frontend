
import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData";
import { encryptToJson } from "../Utils/functions";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getUserData = async (token) => {

    try {

        const response = await fetch(BASE_URL + "/user/user-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token":token
            }
        });

        let json = await response.json();
        json = DecryptResponseData(json)

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() };
    }
}


export const getUserDataById = async (role, id) => {

    try {

        const response = await fetch(BASE_URL + `/user/user-data/${role}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
            }
        });

        let json = await response.json();
        json = DecryptResponseData(json)

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() };
    }
}


export const callOnBoardingProcess = async (data, token) => {

    try {

        const encryptedData = encryptToJson(data);
        const DATA = { payload: encryptedData }

        const response = await fetch(BASE_URL + "/user/onboarding", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token":token
            },
            
            body: JSON.stringify(DATA),
        })

        let json = await response.json();
        json = DecryptResponseData(json)

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() };
    }
}