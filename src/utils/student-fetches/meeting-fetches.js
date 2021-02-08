import fetch from "superagent";
const serverUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`

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