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
    const response = await request
        .post(`${serverUrl}/teacher/meetings/publish/${meetingId}`)
        .withCredentials();

    return response.body;

}

export async function unpublishMeeting(meetingId) {
    const response = await request
        .post(`${serverUrl}/teacher/meetings/unpublish/${meetingId}`)
        .withCredentials();

    return response.body;
}

export async function updateMeeting(meetingId, meetingInfo) {
    console.log("🚀 ~ file: meeting-fetches.js ~ line 32 ~ updateMeeting ~ meetingId, meetingInfo", meetingId, meetingInfo);
    const response = await request
        .put(`${serverUrl}/teacher/meetings/update/${meetingId}`)
        .send({ meetingInfo })
        .withCredentials();

    return response.body;
}
