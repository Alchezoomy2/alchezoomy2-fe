import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllStudentMeetings() {
    const response = await fetch
        .get(serverUrl + "/student/meetings")
        .withCredentials();

    return response.body;
}

export async function getMeetingDetails(meetingId) {
    const response = await fetch
        .get(`${serverUrl}/student/meetings/${meetingId}`)
        .withCredentials();

    return response.body;
}