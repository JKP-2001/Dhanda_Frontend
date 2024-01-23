
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

        const json = await response.json();

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() };
    }
}