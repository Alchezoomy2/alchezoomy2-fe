import React, { useEffect } from "react";
import { useStateStore } from "../../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { teacherAuth } from "../../../utils/teacher-fetches/auth-fetches";
import PropTypes from "prop-types";


export const AutoRedirect = ({ location }) => {
    const store = useStateStore();
    const history = useHistory();
    let params = new URLSearchParams(location.search);
    const code = params.get("code");
    const jwt = params.get("state");
    console.log("🚀 ~ file: Redirect.jsx ~ line 15 ~ AutoRedirect ~ jwt", jwt);

    useEffect(() => {
        async function loginTeacher() {
            const returnedObject = await teacherAuth(code, jwt);

            if (returnedObject.message) {
                window.alert(returnedObject.message);
                history.push("/");

            } else {
                await store.changeTeacherInfo(returnedObject);
                store.changeLoggedIn();
                history.push("/teacher");
            }
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