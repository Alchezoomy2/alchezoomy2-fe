import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from './StoreProvider';
import { useHistory } from 'react-router-dom';
import fetch from 'superagent';


export const Login = async (props) => {
    const store = useStateStore();
    const history = useHistory();


    if (store.userType === 'student') {
        let returnedStudentInfo = await fetch
            .post(store.serverUrl + '/student/oauth')
            .send({ code: store.code });

        if (returnedStudentInfo.body.new_user) {
            returnedStudentInfo = await fetch
                .post(store.serverUrl + '/student/new')
                .send({ student_info: returnedStudentInfo.body })
        }

        await store.changeStudentInfo(returnedStudentInfo.body);

        const newMeetingObj = await fetch
            .post(store.serverUrl + '/student/meetings')
            .send({ student_info: store.studentInfo })

        store.changeMeetingsObj(newMeetingObj.body);

        const newFavoritesArray = await fetch
            .get(store.serverUrl + '/student/favorite/' + store.studentInfo.id)

        await store.changeFavoriteArray(newFavoritesArray.body);
    }

    return useObserver(() =>
        <p>LOGGING IN!</p>
    )

}