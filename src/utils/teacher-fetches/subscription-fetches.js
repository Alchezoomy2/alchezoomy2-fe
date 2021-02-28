import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllTeacherSubscriptions(teacherId) {
    const response = await request
        .get(`${serverUrl}/teacher/subscriptions/${teacherId}`)
        .withCredentials();

    return response.body;
}

export async function inviteStudent(studentEmail, teacherInfo) {
    const response = await request
        .post(`${serverUrl}/teacher/subscriptions/`)
        .send({
            studentEmail,
            teacherEmail: teacherInfo.email
        })
        .withCredentials();

    return response.body;
}

export async function deleteSubscription(studentId, teacherId) {
    const response = await request
        .delete(`${serverUrl}/teacher/subscriptions/`)
        .withCredentials();

    return response.body;
}