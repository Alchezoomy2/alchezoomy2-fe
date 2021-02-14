import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllTeacherMeetings(teacher_info) {
    const response = await request
        .post(`${serverUrl}/teacher/meetings`)
        .send({ teacher_info })
        .withCredentials();

    return response.body;

}

export async function publishMeeting(meetingId) {
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
