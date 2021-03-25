import React, { useEffect } from "react";
import { useStateStore } from "./StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { teacherAuth } from "../../utils/teacher-fetches/auth-fetches";



export default function TeacherLogin() {
    const store = useStateStore();
    const history = useHistory();

    useEffect(() => {
        async function loginTeacher() {
            const returnedObject = await teacherAuth(store.code);
            await store.changeTeacherInfo(returnedObject);
            store.changeLoggedIn();
            history.pushState("/teacher");
        }

        loginTeacher();
    }, []);

    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );
}