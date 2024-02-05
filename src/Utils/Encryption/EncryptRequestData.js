import { encryptToJson } from "../functions";

function EncryptRequestData(data){
    return {
        payload:encryptToJson(data)
    }
}

export {EncryptRequestData}
