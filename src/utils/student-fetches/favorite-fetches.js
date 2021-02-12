import fetch from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL

export async function fetchAllStudentFavorites() {
    try {
        const response = await fetch
            .get(`${serverUrl}/student/favorite/`)
            .withCredentials();
        console.log(response.body)
        return response.body
    } catch (err) {
        throw err;
    }
}

export async function createFavorite(favoriteObj) {
    try {
        const response = await fetch
            .post(`${serverUrl}/student/favorite`)
            .send(favoriteObj)
            .withCredentials();
        return response.body
    } catch (err) {
        throw err;
    }

}

export async function deleteFavorite(favoriteId) {
    try {
        const response = await fetch
            .delete(`${serverUrl}/student/favorite/${favoriteId}`)
            .withCredentials();

        return response.body
    } catch (err) {
        throw err;
    }
}