import { useObserver } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStateStore } from './StoreProvider';
import { useHistory } from 'react-router-dom';
import fetch from 'superagent';
import { Backdrop, CircularProgress } from '@material-ui/core';


export const Login = () => {
    const store = useStateStore();
    const history = useHistory();

    useEffect(() => {

        async function loginStudent() {

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

            // const newFavoritesArray = await fetch
            //     .get(store.serverUrl + '/student/favorite/' + store.studentInfo.id)

            // await store.changeFavoriteArray(newFavoritesArray.body);

            history.push('/student/');
        }

        if (store.userType === 'student') {
            loginStudent();
        }
    })

    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    )

}

export default Login;