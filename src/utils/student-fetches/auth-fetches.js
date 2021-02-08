import fetch from "superagent";
const serverUrl = process.env.SERVER_URL


export async function studentAuth(code) {
    try {
        const response = await fetch
            .post(serverUrl + '/student/oauth')
            .send({ code })
        return response.body
    } catch (err) {
        throw err;
    }
}

export async function createStudent(studentInfo) {
    try {
        const response = await fetch
            .post(serverUrl + '/student/new')
            .send({ student_info: studentInfo })
            .withCredentials();

        return response.body
    } catch (err) {
        throw err;
    }
}

