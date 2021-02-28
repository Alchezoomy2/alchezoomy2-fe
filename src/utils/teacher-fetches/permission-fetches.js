import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllTeacherPermissions(teacherId) {
    const response = await request
        .get(`${serverUrl}/teacher/subscriptions/${teacherId}`)
        .withCredentials();

    return response.body;
}