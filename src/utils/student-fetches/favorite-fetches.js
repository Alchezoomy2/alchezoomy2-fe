import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function fetchAllStudentFavorites() {
    const response = await fetch
        .get(`${serverUrl}/student/favorite`)
        .withCredentials();

    return response.body;
}

export async function createFavorite(favoriteObj) {
    const response = await fetch
        .post(`${serverUrl}/student/favorite`)
        .send(favoriteObj)
        .withCredentials();
    return response.body;
}

export async function deleteFavorite(favoriteId) {
    const response = await fetch
        .delete(`${serverUrl}/student/favorite/${favoriteId}`)
        .withCredentials();

    return response.body;
}