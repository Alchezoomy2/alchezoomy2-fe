import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useStateStore } from "../../utils/StoreProvider";
import { useStyles } from "./StudentProfileStyles";
import { studentChangeProfile } from "../../utils/student-fetches/auth-fetches";
import { PropTypes } from "mobx-react";



export default function StudentProfile({ handleLoadingSpinner, openSnackbar }) {
    const store = useStateStore();
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [currentFirstName, setCurrentFirstName] = useState(store.studentInfo.firstName);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        handleLoadingSpinner(true);
        const response = await studentChangeProfile(store.studentInfo.id, { oldPassword, newPassword1 });
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
        if (response.message) {
            openSnackbar("error", response.message);
        } else {
            openSnackbar("success", "Password Changed!");
        }
        handleLoadingSpinner(false);

    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        handleLoadingSpinner(true);
        const response = await studentChangeProfile(store.studentInfo.id, { newFirstName });

        store.changeStudentInfo(response);
        handleLoadingSpinner(false);

        console.log("🚀 ~ file: StudentProfile.jsx ~ line 39 ~ handleNameSubmit ~ response", response);

        if (response.message) {
            console.log("response.message");
            openSnackbar("error", response.message);
        } else {
            console.log("else");
            openSnackbar("success", "Name Changed!");
        }
        setCurrentFirstName(newFirstName);
        setNewFirstName("");
    };


    return (
        <Paper elevation={3} className={classes.root}>
            <div>
                <span>NAME</span>
                <form
                    onSubmit={(e) => handleNameSubmit(e)}
                    className={classes.nameForm}>
                    <TextField
                        id="firstName"
                        variant="outlined"
                        label="Current First Name"
                        value={currentFirstName}
                        disabled
                    />
                    <TextField
                        id="firstName"
                        variant="outlined"
                        label="New First Name"
                        value={newFirstName}
                        onChange={({ target }) => setNewFirstName(target.value)}
                        required
                    />
                    <Button
                        type="submit">
                        SUBMIT
                    </Button>
                </form>
            </div>
            <div>
                <span>CHANGE PASSWORD</span>
                <form
                    onSubmit={(e) => handlePasswordSubmit(e)}
                    className={classes.passwordForm}>
                    <TextField
                        id="oldPassword"
                        variant="outlined"
                        label="Old Password"
                        type="password"
                        value={oldPassword}
                        onChange={({ target }) => setOldPassword(target.value)}
                        required
                    />

                    <TextField
                        id="password1"
                        variant="outlined"
                        label="New Password"
                        value={newPassword1}
                        onChange={({ target }) => setNewPassword1(target.value)}
                        type="password"
                        error={newPassword1 !== newPassword2}
                        required
                    />
                    <TextField
                        id="password2"
                        variant="outlined"
                        label="New Password"
                        value={newPassword2}
                        onChange={({ target }) => setNewPassword2(target.value)}
                        type="password"
                        error={newPassword1 !== newPassword2}
                        required
                    />
                    <Button
                        type="submit">
                        SUBMIT
                    </Button>
                </form>
            </div>
        </Paper>
    );
}


StudentProfile.propTypes = {
    handleLoadingSpinner: PropTypes.func,
    openSnackbar: PropTypes.func
};