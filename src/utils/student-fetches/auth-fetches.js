import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function studentAuth(studentEmail, password) {
    const response = await fetch
        .post(serverUrl + "/student/auth")
        .send({ studentEmail, password })
        .withCredentials();

    return response.body;
}

export async function createStudent(studentEmail, teacherEmail, password, firstName) {
    const response = await fetch
        .post(serverUrl + "/student/new")
        .send({ studentEmail, teacherEmail, password, firstName })
        .withCredentials();

    return response.body;
}

export async function studentExists(jwt) {
    const response = await fetch
        .post(serverUrl + "/student/exists/")
        .send({ jwt })
        .withCredentials();

    return response.body;
}

export async function studentChangeProfile(studentId, payload) {
    const response = await fetch
        .patch(serverUrl + "/student/user/" + studentId)
        .send(payload)
        .withCredentials();

    return response.body;
}

export async function deleteStudent(studentId, password) {
    const response = await fetch
        .delete(serverUrl + "/student/" + studentId)
        .send({ password: password })
        .withCredentials();

    return response.body;
}