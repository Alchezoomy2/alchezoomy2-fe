import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchS3Obj() {
    const response = await fetch
        .get(serverUrl + "/admin/S3")
        .withCredentials();

    return response.body;
}

export async function updateS3Obj(newS3Obj) {
    const response = await fetch
        .put(serverUrl + "/admin/S3")
        .send({ newS3Obj })
        .withCredentials();

    return response.body;
}