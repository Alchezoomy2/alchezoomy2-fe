import { useStateStore } from './StoreProvider.js'




export const retrieveExisitingMeetings = async () => {
    const store = useStateStore();
    const newMeetingObj = await fetch
        .post(store.serverUrl + '/teacher/meetings')
        .send({ teacher_info: store.teacherInfo })
    store.changeMeetingsObj(newMeetingObj.body);
}

module.exports = { retrieveExisitingMeetings }