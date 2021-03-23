import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;


export async function fetchAllStudents() {
    const response = await fetch
        .get(serverUrl + " /admin/student")
        .withCredentials();

    return response.body;
}

export async function deleteStudent(studentId) {
    const response = await fetch
        .delete(serverUrl + `/admin/student/${studentId}`)
        .withCredentials();

    return response.body;
}

