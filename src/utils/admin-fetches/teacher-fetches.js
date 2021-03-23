import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;


export async function inviteTeacher(teacherEmailArray) {
    const response = await fetch
        .post(serverUrl + "/admin/invite")
        .send({ teacherEmailArray })
        .withCredentials();

    return response.body;
}

export async function fetchAllTeachers() {
    console.log("fetchAllTeachers");
    const response = await fetch
        .get(serverUrl + "admin/teacher")
        .withCredentials();

    return response.body;
}

export async function deleteTeacher(teacherId) {
    const response = await fetch
        .delete(serverUrl + `admin/teacher/${teacherId}`)
        .withCredentials();

    return response.body;
}

