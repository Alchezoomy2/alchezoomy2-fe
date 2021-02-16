// import { useObserver } from 'mobx-react';
import React, { useEffect } from "react";
import { useStateStore } from "./StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { studentAuth, createStudent, validateJWT } from "./utils/student-fetches/auth-fetches";
import { teacherAuth } from "./utils/teacher-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "./utils/student-fetches/meeting-fetches.js";

export const Login = () => {
    const store = useStateStore();
    const history = useHistory();

    useEffect(() => {

        async function loginStudent() {
            let returnedStudentInfo = await studentAuth(store.code);

            if (returnedStudentInfo.newUser) {
                returnedStudentInfo = await createStudent(returnedStudentInfo);
            }

            await store.changeStudentInfo(returnedStudentInfo);

            const newMeetingObj = await fetchAllStudentMeetings();

            store.changeMeetingsObj(newMeetingObj);

            history.push("/student/");
        }


        async function loginTeacher() {
            const returnedObject = await teacherAuth(store.code);
            await store.changeTeacherInfo(returnedObject);
            history.push("/teacher/");

        }

        async function handleInvite() {
            let returnedStudentInfo = await studentAuth(store.code);

            let returnedValidation = await validateJWT(store.JWT, returnedStudentInfo.email);

            console.log(returnedValidation);
        }

        if (store.userType === "student") {
            loginStudent();
        } else if (store.userType === "teacher") {
            loginTeacher();
        } else if (store.userType === "invite") {
            handleInvite();
        }
    });

    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );

};

export default Login;