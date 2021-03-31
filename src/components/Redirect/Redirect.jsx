import React, { useEffect } from "react";
import { useStateStore } from "../../StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { teacherAuth } from "../../utils/teacher-fetches/auth-fetches";


export const AutoRedirect = ({ location }) => {
    const store = useStateStore();
    const history = useHistory();
    let code = new URLSearchParams(location.search);

    useEffect(() => {
        async function loginTeacher() {
            const returnedObject = await teacherAuth(code);
            await store.changeTeacherInfo(returnedObject);
            store.changeLoggedIn();
            history.push("/teacher");
        }

        loginTeacher();
    }, []);

    history.push("/teacher/login");

    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );

};

export default AutoRedirect;

