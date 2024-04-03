import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData";
import { EncryptRequestData } from "../Utils/Encryption/EncryptRequestData";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserDM = async(page, limit, type)=>{
    try{
        const response = await fetch(BASE_URL+"/dm"+`?page=${page}&limit=${limit}&type=${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": localStorage.getItem("token"),
            }
        });
        let json = await response.json();
        json = DecryptResponseData(json)
        return json;
    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


export const answerToDm = async(id, answer)=>{
    try{
        const DATA = EncryptRequestData({"answer": answer})
        const response = await fetch(BASE_URL+"/dm/"+id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(DATA)
        });
        let json = await response.json();
        json = DecryptResponseData(json)
        return json;
    }catch(err){
        return { success: false, msg: err.toString() }
    }
}


export const dmTransactions = async(page, limit, month)=>{
    try{
        const response = await fetch(BASE_URL+"/dm/transactions"+`?page=${page}&limit=${limit}&month=${month}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": localStorage.getItem("token"),
            }
        });
        let json = await response.json();
        json = DecryptResponseData(json)
        return json;
    }catch(err){
        return { success: false, msg: err.toString() }
    }
}