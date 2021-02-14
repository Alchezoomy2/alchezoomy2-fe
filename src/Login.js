// import { useObserver } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStateStore } from './StoreProvider';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { studentAuth, createStudent } from './utils/student-fetches/auth-fetches';
import { teacherAuth, createTeacher } from './utils/teacher-fetches/auth-fetches';
import { fetchAllStudentMeetings } from './utils/student-fetches/meeting-fetches.js'
import { fetchAllTeacherMeetings } from './utils/teacher-fetches/meeting-fetches.js'

export const Login = () => {
    const store = useStateStore();
    const history = useHistory();

    useEffect(() => {

        async function loginStudent() {
            let returnedStudentInfo = await studentAuth(store.code)

            if (returnedStudentInfo.new_user) {
                returnedStudentInfo = await createStudent(returnedStudentInfo)
            }

            await store.changeStudentInfo(returnedStudentInfo);

            const newMeetingObj = await fetchAllStudentMeetings()

            store.changeMeetingsObj(newMeetingObj);

            history.push('/student/');
        }


        async function loginTeacher() {
            const returnedObject = await teacherAuth(store.code);
            await store.changeTeacherInfo(returnedObject);

            // if (!store.teacherInfo.new_user) {

            //     let newMeetingObj = await fetchAllTeacherMeetings(store.teacherInfo)

            //     store.changeMeetingsObj(newMeetingObj);
            // }
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