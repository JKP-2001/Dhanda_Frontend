
import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData";
import { EncryptRequestData } from "../Utils/Encryption/EncryptRequestData";
import { decryptFromJson, encryptToJson } from "../Utils/functions";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const fetchTransactions = async (page, limit) => {

    try {

        const response = await fetch(BASE_URL + "/transactions"+`?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": localStorage.getItem("token"),
            },
        });

        const json = await response.json();

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() }
    }
}