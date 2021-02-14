import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function teacherAuth(code) {
    const response = await request
        .post(serverUrl + "/teacher/oauth")
        .send({ code })
        .withCredentials();

    return response.body;
}

export async function createTeacher(teacher_info) {
    const response = await request
        .post(serverUrl + "/teacher/new")
        .send({ teacher_info })
        .withCredentials();

    return response.body;
}