import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL

export async function fetchAllStudentMeetings() {
    try {
        const response = await fetch
            .get(serverUrl + '/student/meetings')
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function getMeetingDetails(meetingId) {
    try {
        const response = await fetch
            .get(`${serverUrl}/student/meetings/${meetingId}`)
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}