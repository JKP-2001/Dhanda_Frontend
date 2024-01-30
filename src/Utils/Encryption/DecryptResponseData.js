import { decryptFromJson } from "../functions";

function DecryptResponseData(data){
    return decryptFromJson(data.payload)
}

export {DecryptResponseData}