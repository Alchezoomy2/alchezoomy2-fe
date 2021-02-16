import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function teacherAuth(code) {
    const response = await request
        .post(serverUrl + "/teacher/oauth")
        .send({ code })
        .withCredentials();

    return response.body;
}

export async function createTeacher(teacherInfo) {
    const response = await request
        .post(serverUrl + "/teacher/new")
        .send({ teacherInfo })
        .withCredentials();

    return response.body;
}

export async function inviteStudent(studentEmail, teacherInfo) {
    const response = await request
        .post(`${serverUrl}/teacher/invite/`)
        .send({
            studentEmail,
            teacherEmail: teacherInfo.email
        })
        .withCredentials();

    return response.body;
}