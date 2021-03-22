
import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function adminAuth(userName, password) {
    const response = await fetch
        .post(serverUrl + "/admin/oauth")
        .send({ userName, password })
        .withCredentials();

    return response.body;
}

export async function adminSetupPassword(userName, password) {
    const response = await fetch
        .post(serverUrl + "/admin/new")
        .send({ userName, password })
        .withCredentials();

    return response.body;
}

export async function adminChangePassword(userName, oldPassword, newPassword) {
    const response = await fetch
        .post(serverUrl + "/admin/password")
        .send({ userName, oldPassword, newPassword })
        .withCredentials();

    return response.body;
}

