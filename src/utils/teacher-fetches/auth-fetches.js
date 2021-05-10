import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;


export async function teacherAuth(code, jwt) {

    const response = await request
        .post(serverUrl + "/teacher/oauth")
        .send({ code, jwt })
        .withCredentials();

    return response.body;
}

export async function createTeacher(teacherInfo) {
    const response = await request
        .post(serverUrl + "/teacher/create")
        .send({ teacherInfo })
        .withCredentials();

    return response.body;
}

export async function fetchColorPalette(picUrl) {
    const response = await request
        .post(serverUrl + "/teacher/color")
        .send({ picUrl })
        .withCredentials();

    return response.body;
}

export async function changeColor(teacherId, newColor) {
    const response = await request
        .put(serverUrl + "/teacher/color/" + teacherId)
        .send({ newColor })
        .withCredentials();

    return response.body;
}

