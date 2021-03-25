import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function studentAuth(userName, password) {
    const response = await fetch
        .post(serverUrl + "/student/oauth")
        .send({ userName, password })
        .withCredentials();

    return response.body;
}

export async function createStudent(userName, password, JWT) {
    const response = await fetch
        .post(serverUrl + "/student/new")
        .send({ userName, password, JWT })
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