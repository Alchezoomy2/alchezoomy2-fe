import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';

const retrieveTeacherInfo = async (code, serverUrl) => {

    return await fetch
        .post(serverUrl + '/teacher/oauth')
        .send({ code });

}