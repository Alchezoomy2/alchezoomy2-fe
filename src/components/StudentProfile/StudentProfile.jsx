import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useStateStore } from "../../utils/StoreProvider";
import { useStyles } from "./StudentProfileStyles";
import { studentChangeProfile } from "../../utils/student-fetches/auth-fetches";
import { PropTypes } from "mobx-react";



export default function StudentProfile({ handleLoadingSpinner }) {
    const store = useStateStore();
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        handleLoadingSpinner();
        const response = await studentChangeProfile(store.studentInfo.id, { oldPassword, newPassword1 });
        console.log("🚀 ~ file: StudentProfile.jsx ~ line 19 ~ handlePasswordSubmit ~ response", response);

        handleLoadingSpinner();
    };


    return (
        <Paper elevation={3} className={classes.root}>
            <div>
                <form
                    onSubmit={(e) => handlePasswordSubmit(e)}
                    className={classes.passwordForm}>
                    <TextField
                        id="oldPassword"
                        variant="outlined"
                        value={oldPassword}
                        onChange={({ target }) => setOldPassword(target.value)}
                        required
                    />
                    <TextField
                        id="password1"
                        label="New Password"
                        value={newPassword1}
                        onChange={({ target }) => setNewPassword1(target.value)}
                        type="password"
                        error={newPassword1 !== newPassword2}
                        required
                    />
                    <TextField
                        id="password2"
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
    handleLoadingSpinner: PropTypes.func
};