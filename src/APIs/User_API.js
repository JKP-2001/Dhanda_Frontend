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
        "auth-token": token,
      },
    });

    let json = await response.json();
    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};

export const getUserDataById = async (role, id) => {
  try {
    const response = await fetch(BASE_URL + `/user/user-data/${role}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
      },
    });

    let json = await response.json();
    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};

export const callOnBoardingProcess = async (data, token) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + "/user/onboarding", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },

      body: JSON.stringify(DATA),
    });

    let json = await response.json();
    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};

export const updateTimeSlots = async (data, token) => {
  try {
    const encryptedData = encryptToJson({ availableTimeslots: data });
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + "/user/handle-time-slots", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },

      body: JSON.stringify(DATA),
    });

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};

export const submitForm = async (data) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + "/user/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
      },

      body: JSON.stringify(DATA),
    });

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
};


export const updateProfilePic = async (imageFiles,token) => {
    
  try {
      let formData = new FormData();
      
      imageFiles.forEach((file, index) => {
          formData.append('files', file);
      });


      const response = await fetch(BASE_URL + `/user/profile-image-upload`, {
          method: "PATCH",
          headers: {
              "security-key": security_key,
              "auth-token": token
          },
          body: formData
      });

      let json = await response.json();
      json = DecryptResponseData(json)

      return json;

  } catch (err) {
      return { success: false, msg: err.toString() };
  }
}


export const addUserEducation = async (data, token) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + "/user/add-education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },
      body: JSON.stringify(DATA),
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
}


export const editUserEducation = async (data, token, id) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + `/user/edit-education/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },
      body: JSON.stringify(DATA),
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
}


export const addUserExperience = async (data, token) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + "/user/add-experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },
      body: JSON.stringify(DATA),
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
}


export const editUserExperience = async (data, token, id) => {
  try {
    const encryptedData = encryptToJson(data);
    const DATA = { payload: encryptedData };

    const response = await fetch(BASE_URL + `/user/edit-experience/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      },
      body: JSON.stringify(DATA),
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;

  } catch (err) {
    return { success: false, msg: err.toString() };
  }
}


export const deleteUserEducation = async (token, id) => {
  try {
    

    const response = await fetch(BASE_URL + `/user/delete-education/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      }
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;
  } catch (err) {
    return { success: false, msg: err.toString() };
  }
}


export const deleteUserExperience = async (token, id) => {
  try {
    
    const response = await fetch(BASE_URL + `/user/delete-experience/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "security-key": security_key,
        "auth-token": token,
      }
    })

    let json = await response.json();

    json = DecryptResponseData(json);

    return json;
  }catch (err) {
    return { success: false, msg: err.toString() };
  }
}
