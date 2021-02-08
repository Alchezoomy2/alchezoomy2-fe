import fetch from "superagent";

const serverUrl = process.env.REACT_APP_SERVER_URL
const zoomURL = process.env.REACT_APP_ZOOM_API_URL
const serverPort = process.env.REACT_APP_SERVER_PORT
const s3 = process.env.REACT_APP_S3_VIDEO_URL

export async function teacherAuth(code) {
    console.log(serverUrl)
    console.log(zoomURL)
    console.log(serverPort)
    console.log(s3)
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