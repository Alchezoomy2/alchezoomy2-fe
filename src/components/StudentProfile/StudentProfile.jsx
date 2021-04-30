import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useStateStore } from "../../utils/StoreProvider";
import { useStyles } from "./StudentProfileStyles";
import { studentChangeProfile, deleteStudent } from "../../utils/student-fetches/auth-fetches";
import { PropTypes } from "mobx-react";
import { useHistory } from "react-router-dom";




export default function StudentProfile({ openSnackbar }) {
    const history = useHistory();
    const store = useStateStore();
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [currentFirstName, setCurrentFirstName] = useState(store.studentInfo.firstName);
    const [openDeletePassword, setOpenDeletePassword] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const response = await studentChangeProfile(store.studentInfo.id, { oldPassword, newPassword1 });
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");

        if (response.message) {
            openSnackbar("error", response.message);
        } else {
            openSnackbar("success", "Password Changed!");
        }

    };

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        const response = await studentChangeProfile(store.studentInfo.id, { newFirstName });

        store.changeStudentInfo(response);
        if (response.message) {
            openSnackbar("error", response.message);
        } else {
            openSnackbar("success", "Name Changed!");
        }
        setCurrentFirstName(newFirstName);
        setNewFirstName("");
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (openDeletePassword) {
            const response = await deleteStudent(store.studentInfo.id, deletePassword);

            if (response.success) {
                openSnackbar("success", response.message);
                store.changeLoggedIn();
                localStorage.clear();
                history.push("/");
            }
            openSnackbar("error", response.message);
            setDeletePassword("");
        } else {
            setOpenDeletePassword(true);
        }

    };

    return (
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.components}>
                    <div className={classes.component}>
                        <div className={classes.label}>
                            CHANGE NAME
                    </div>
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
                                autocomplete="given-name"
                                value={newFirstName}
                                onChange={({ target }) => setNewFirstName(target.value)}
                                required
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary">
                                SUBMIT
                    </Button>
                        </form>
                    </div>
                    <div className={classes.component}>
                        <div className={classes.label}>
                            CHANGE PASSWORD
                    </div>
                        <form
                            onSubmit={(e) => handlePasswordSubmit(e)}
                            className={classes.passwordForm}>
                            <TextField
                                id="oldPassword"
                                variant="outlined"
                                label="Old Password"
                                type="password"
                                autocomplete="current-password"
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
                                autocomplete="new-password"
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
                                autocomplete="new-password"
                                error={newPassword1 !== newPassword2}
                                required
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary">
                                SUBMIT
                    </Button>
                        </form>
                    </div>
                    <div className={classes.component}>
                        {openDeletePassword ?
                            <div>
                                <span className={classes.label}>ENTER PASSWORD TO DELETE ACCOUNT</span>
                                <TextField
                                    id="deletePassword"
                                    variant="outlined"
                                    label="Current Password"
                                    value={deletePassword}
                                    onChange={({ target }) => setDeletePassword(target.value)}
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                />
                            </div>
                            :
                            <span className={classes.label}>DELETE ACCOUNT</span>
                        }
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteAccount}>
                            DELETE ACCOUNT
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}


StudentProfile.propTypes = {
    openSnackbar: PropTypes.func
};