import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData.js"
import { EncryptRequestData } from "../Utils/Encryption/EncryptRequestData"

const BASE_URL = process.env.REACT_APP_BASE_URL 

async function GetInterviewersList(page, limit){
    try {
        const query = EncryptRequestData(
            {
                page:page,
                limit:limit
            }
        )
        const response= await fetch(BASE_URL + "/interviewers/all?" + new URLSearchParams(query), {
            method:"GET"
        }) 
        const result = await response.json()
        console.log('Resopnse of query =', result)

        const decryptedResult= DecryptResponseData(result)
        return decryptedResult.result
    }
    catch (e){
        console.error('Error at GetInterviewsList :',e)
    }
}

export {GetInterviewersList}