
import { encryptToJson } from "../Utils/functions";

const security_key = process.env.REACT_APP_SECURITY_KEY;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllPost = async (page, limit) => {

    try {
        const response = await fetch(BASE_URL + `/get-all-posts?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();
        return json;
    } catch (err) {
        return { success: false, msg: err.toString() }
    }
}


export const getAllPostOfUser = async (page, limit, token, id , role) => {

    try {
        const response = await fetch(BASE_URL + `/get-all-posts-of-user/${role}/${id}??page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        const json = await response.json();
        return json;
    } catch (err) {
        return { success: false, msg: err.toString() }
    }
}

export const getBookmarkedPostUser = async (page, limit, token, user_id, role) => {

    try {
        const response = await fetch(BASE_URL + `/get-book-marked-post/${role}/${user_id}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        const json = await response.json();
        return json;
    } catch (err) {
        return { success: false, msg: err.toString() }
    }
}





export const createPost = async (content, imageFiles, token) => {
    try {

        let formData = new FormData();
        // Append each file from the imageFiles array with the key 'files'
        imageFiles.forEach((file, index) => {
            formData.append('files', file);
        });

        // Append the content as a separate field
        formData.append('content', content);


        const response = await fetch(BASE_URL + "/create-post", {
            method: "POST",
            
            headers: {
                "security-key": security_key,
                "auth-token": token
            },
            body: formData
        });

     

        const json = await response.json();
        return json;
    } catch (err) {
        return { success: false, msg: err.toString() };
    }
};


export const updatePost = async (post_id, content, imageFiles, filesToBeDeleted, token) => {
    
    try {
        let formData = new FormData();
        
        imageFiles.forEach((file, index) => {
            formData.append('files', file);
        });

        formData.append('content', content);
        formData.append('filesToBeDeleted', JSON.stringify(filesToBeDeleted));

        const response = await fetch(BASE_URL + `/update-post/${post_id}`, {
            method: "PATCH",
            headers: {
                "security-key": security_key,
                "auth-token": token
            },
            body: formData
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}


export const deletePost = async (post_id, token) => {

    try {

        const response = await fetch(BASE_URL + `/delete-post/${post_id}`, {
            method: "DELETE",
            headers: {
                "security-key": security_key,
                "auth-token": token
            }
        });

        const json = await response.json();
        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}

export const likePost = async (post_id, token) => {

    try {

        const response = await fetch(BASE_URL + `/like-post/${post_id}`, {
            method: "PATCH",
            headers: {
                "security-key": security_key,
                "auth-token": token
            }
        });

        const json = await response.json();
        return json;
    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}


export const bookMarkPost = async (post_id, token) => {
    try{

        const response = await fetch(BASE_URL + `/bookmark-post/${post_id}`, {
            method: "PATCH",
            headers: {
                "security-key": security_key,
                "auth-token": token
            }
        });

        const json = await response.json();

        return json;

    }catch(err){
        return { success: false, msg: err.toString() };
    }
}


export const getAPost = async (post_id) => {

    try {

        const response = await fetch(BASE_URL + `/get-post/${post_id}`, {
            method: "GET",
            headers: {
                "security-key": security_key,
            }
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}



export const getCommentsOfAPost = async (post_id, page, limit) =>{

    try {

        const response = await fetch(BASE_URL + `/post/comments/${post_id}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "security-key": security_key,
            }
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}

export const getRepliesOfAPost = async (comment_id, page, limit) =>{

    try {

        const response = await fetch(BASE_URL + `/comments/replies/${comment_id}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "security-key": security_key,
            }
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}


export const postAComment = async (post_id, content, token) => {

    try {

        const response = await fetch(BASE_URL + `/comment/${post_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": token
            },
            body: JSON.stringify({"content":content})
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}


export const postAReply = async (comment_id, content, token) => {

    try {

        const response = await fetch(BASE_URL + `/reply/comment/${comment_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": security_key,
                "auth-token": token
            },
            body: JSON.stringify({"content":content})
        });

        const json = await response.json();

        return json;

    } catch (err) {
        return { success: false, msg: err.toString() };
    }
}

