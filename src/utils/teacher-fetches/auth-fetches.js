import fetch from "superagent";


export async function teacherAuth(code) {
    const serverUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
    console.log('teacherAuth()')
    try {
        const response = await fetch
            .post(serverUrl + '/teacher/oauth')
            .send({ code })

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function createTeacher(teacher_info) {
    const serverUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
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