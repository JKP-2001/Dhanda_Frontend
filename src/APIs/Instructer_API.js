import { DecryptResponseData } from "../Utils/Encryption/DecryptResponseData";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchInstructers = async (token, fetchId) => {

  try {
    const response = await fetch(
      BASE_URL + `/interviewers/all?fetchId=${encodeURIComponent(fetchId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "security-key": security_key,
          "auth-token": token,
        },
      }
    );

    let json = await response.json();
    
    json = DecryptResponseData(json)
    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};

export const companyWiseFetchInstructor = async (token, fetchId) => {
  
  try {
    const response = await fetch(
      BASE_URL + `/interviewers/all?fetchId=${encodeURIComponent(fetchId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "security-key": security_key,
          "auth-token": token,
        },
      }
    );

    let json = await response.json();

    json = DecryptResponseData(json)
    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};
