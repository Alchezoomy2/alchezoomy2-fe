import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL

export async function teacherAuth(code) {
    try {
        const response = await fetch
            .post(serverUrl + '/teacher/oauth')
            .send({ code })
        console.log(response.body)
        return response.body
    } catch (err) {
        throw err;
    }
}

export async function createTeacher(teacher_info) {
    try {
        const response = await fetch
            .post(serverUrl + '/teacher/new')
            .send({ teacher_info })
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}