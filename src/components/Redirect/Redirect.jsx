import React, { useEffect } from "react";
import { useStateStore } from "../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { teacherAuth } from "../../utils/teacher-fetches/auth-fetches";
import PropTypes from "prop-types";


export const AutoRedirect = ({ location }) => {
    const store = useStateStore();
    const history = useHistory();
    let code = new URLSearchParams(location.search);

    useEffect(() => {
        async function loginTeacher() {

            const returnedObject = await teacherAuth(code.get("code"));
            await store.changeTeacherInfo(returnedObject);
            store.changeLoggedIn();
            history.push("/teacher");
        }

        loginTeacher();
    }, []);


    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );

};

export default AutoRedirect;

AutoRedirect.propTypes = {
    location: PropTypes.object
};