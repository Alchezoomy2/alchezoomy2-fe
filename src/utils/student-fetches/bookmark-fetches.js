import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllStudentBookmarks() {
    const response = await fetch
        .get(`${serverUrl}/student/bookmark`)
        .withCredentials();

    return response.body;
}

export async function createBookmark(bookmarkInfo) {
    const response = await fetch
        .post(`${serverUrl}/student/bookmark`)
        .send(bookmarkInfo)
        .withCredentials();

    return response.body;
}

export async function deleteBookmark(bookmarkId) {
    const response = await fetch
        .delete(`${serverUrl}/student/bookmark/${bookmarkId}`)
        .withCredentials();

    return response.body;
}