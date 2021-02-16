import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function studentAuth(code) {
    const response = await fetch
        .post(serverUrl + "/student/oauth")
        .send({ code })
        .withCredentials();
    return response.body;
}

export async function createStudent(studentInfo) {
    const response = await fetch
        .post(serverUrl + "/student/new")
        .send({ studentInfo })
        .withCredentials();

    return response.body;
}

export async function validateJWT(JWT, studentEmail) {
    const response = await fetch
        .post(serverUrl + "/student/invite")
        .send({ JWT, studentEmail })
        .withCredentials();

    return response.body;
}

