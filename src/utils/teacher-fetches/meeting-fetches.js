import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllTeacherMeetings(teacherInfo) {
    const response = await request
        .post(`${serverUrl}/teacher/meetings`)
        .send({ teacherInfo })
        .withCredentials();

    return response.body;

}

export async function publishMeeting(meetingId) {
    console.log(`publish meeting: ${meetingId}`);
    const response = await request
        .post(`${serverUrl}/teacher/publish/${meetingId}`)
        .withCredentials();

    return response.body;

}

export async function unpublishMeeting(meetingId) {
    const response = await request
        .post(`${serverUrl}/teacher/unpublish/${meetingId}`)
        .withCredentials();

    return response.body;

}
