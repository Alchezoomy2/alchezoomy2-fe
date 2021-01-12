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
            const agent = fetch.agent()

            let returnedStudentInfo = await agent
                .post(store.serverUrl + '/student/oauth')
                .send({ code: store.code })

            console.log('here!')
            console.log(returnedStudentInfo)

            if (returnedStudentInfo.body.new_user) {
                returnedStudentInfo = await agent
                    .post(store.serverUrl + '/student/new')
                    .send({ student_info: returnedStudentInfo.body })
            }

            await store.changeStudentInfo(returnedStudentInfo.body);

            const newMeetingObj = await agent
                .post(store.serverUrl + '/student/meetings')
                .withCredentials()
                .send({ student_info: store.studentInfo })

            store.changeMeetingsObj(newMeetingObj.body);

            history.push('/student/');
        }


        async function loginTeacher() {
            let newMeetingObj;

            const returnedObject = await fetch
                .post(store.serverUrl + '/teacher/oauth')
                .send({ code: store.code });

            await store.changeTeacherInfo(returnedObject.body);

            if (store.teacherInfo.new_user) {
                const returnedObject = await fetch
                    .post(store.serverUrl + '/teacher/new')
                    .send({ teacher_info: store.teacherInfo });

                store.changeTeacherInfo(returnedObject.body)
            }

            newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/meetings')
                .withCredentials()

                .send({ teacher_info: store.teacherInfo })

            store.changeMeetingsObj(newMeetingObj.body);

            history.push('/teacher/');

        }
        if (store.userType === 'student') {
            loginStudent();
        } else if (store.userType === 'teacher') {
            loginTeacher();
        }
    })

    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    )

}

export default Login;