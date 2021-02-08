import fetch from "superagent";
const serverUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`

export async function fetchAllTeacherMeetings(teacher_info) {
    try {
        const response = await fetch
            .post(`${serverUrl}/teacher/meetings`)
            .send({ teacher_info })
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function publishMeeting(meetingId) {
    try {
        const response = await fetch
            .post(`${serverUrl}/teacher/publish/${meetingId}`)
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function unpublishMeeting(meetingId) {
    try {
        const response = await fetch
            .post(`${serverUrl}/teacher/unpublish/${meetingId}`)
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}