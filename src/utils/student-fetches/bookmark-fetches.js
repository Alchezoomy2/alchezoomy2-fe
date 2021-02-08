import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL

export async function fetchAllStudentBookmarks() {
    try {
        const response = await fetch
            .get(`${serverUrl}/student/bookmark`)
            .withCredentials()

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function createBookmark(bookmarkInfo) {
    try {
        const response = await fetch
            .post(`${serverUrl}/student/bookmark`)
            .send(bookmarkInfo)
            .withCredentials();

        return response.body
    } catch (err) {
        throw err;
    }
}

export async function deleteBookmark(bookmarkId) {
    try {
        const response = await fetch
            .delete(`${serverUrl}/student/bookmark/${bookmarkId}`)
            .withCredentials();

        return response.body
    } catch (err) {
        throw err;
    }
}