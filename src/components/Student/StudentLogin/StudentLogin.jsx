import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { useStyles } from "./StudentLoginStyles.js";
import { studentAuth } from "../../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import snackBar from "../../../hooks/snackBar/snackBar";
import LandingPageAppBar from "../../Shared/LandingPageAppBar/LandingPageAppBar";


export default function StudentLogin() {
    const history = useHistory();
    const classes = useStyles();
    const store = useStateStore();
    const { openSnackbar, SnackbarComponent } = snackBar();
    const [studentEmail, setStudentEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentInfo = await studentAuth(studentEmail.toLowerCase().trim(), password);
            if (studentInfo.error) {
                openSnackbar("error", e.message);
                setPassword("");
            } else {
                store.changeStudentInfo(studentInfo);

                const newMeetingObj = await fetchAllStudentMeetings();

                store.changeMeetingsObj(newMeetingObj);
                store.changeLoggedIn();
                history.push("/student");
            }
        } catch (e) {
            openSnackbar("error", e.message);
            setPassword("");
        }
    };

    const handleResetPassword = () => {
        history.push("/student/reset");
    };

    return (
        <>
            <LandingPageAppBar />
            <Paper
                elevation={3}
                className={classes.root}>
                <div
                    className={classes.welcomeFrame}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo"
                    />

                    <form
                        onSubmit={handleSubmit}
                        className={classes.loginForm}
                    >
                        <Typography
                            variant="h5">
                            Student Sign In
                        </Typography>
                        <TextField
                            id="studentEmail"
                            label="Email"
                            value={studentEmail}
                            onChange={({ target }) => setStudentEmail(target.value)}
                            autocomplete="email"
                            variant="outlined"
                            required
                        />
                        <TextField
                            id="password"
                            label="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            autocomplete="current-password"
                            type="password"
                            variant="outlined"
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary">
                            SUBMIT
                    </Button>
                    </form>
                    <Typography
                        onClick={handleResetPassword}
                        className={classes.resetButton}>
                        Reset Your Password
                    </Typography>
                </div>
            </Paper>
            <SnackbarComponent />
        </>
    );

}

