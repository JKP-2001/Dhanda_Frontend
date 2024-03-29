

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getAllMeetings = async (meetings) => {

    try {

        const response = await fetch(BASE_URL+"/meetings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "security-key": process.env.REACT_APP_SECURITY_KEY
            },
            body:
                JSON.stringify({meetingIdArray:meetings}),
        })

        const json = await response.json();

        return json;

    } catch (err) {

        return { success: false, msg: err.toString() }
    }
}