import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function studentAuth(studentEmail, password) {
    const response = await fetch
        .post(serverUrl + "/student/auth")
        .send({ studentEmail, password })
        .withCredentials();

    return response.body;
}

export async function createStudent(studentEmail, teacherEmail, password) {
    const response = await fetch
        .post(serverUrl + "/student/new")
        .send({ studentEmail, teacherEmail, password })
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

export async function studentChangePassword(userName, oldPassword, newPassword) {
    const response = await fetch
        .post(serverUrl + "/student/password")
        .send({ userName, oldPassword, newPassword })
        .withCredentials();

    return response.body;
}