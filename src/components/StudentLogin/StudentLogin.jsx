import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { useStyles } from "./StudentLoginStyles.js";
import { studentAuth } from "../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import snackBar from "../../hooks/snackBar/snackBar";
import LandingPageAppBar from "../LandingPageAppBar/LandingPageAppBar";


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
            const studentInfo = await studentAuth(studentEmail.toLowerCase(), password);
            if (studentInfo.error) {
                openSnackbar("error", "Invalid username or password");
                setPassword("");
            } else {
                store.changeStudentInfo(studentInfo);

                const newMeetingObj = await fetchAllStudentMeetings();

                store.changeMeetingsObj(newMeetingObj);
                store.changeLoggedIn();
                history.push("/student");
            }
        } catch (e) {
            openSnackbar("error", "Invalid username or password");
            setPassword("");
        }
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
                    <Typography
                        variant="h5">
                        Sign in as a Teacher
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        className={classes.loginForm}
                    >
                        <TextField
                            id="studentEmail"
                            label="Email"
                            value={studentEmail}
                            onChange={({ target }) => setStudentEmail(target.value)}
                            autocomplete="email"
                            required
                        />
                        <TextField
                            id="password"
                            label="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            autocomplete="current-password"
                            type="password"
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit">
                            SUBMIT
                    </Button>
                    </form>
                </div>
            </Paper>
            <SnackbarComponent />
        </>
    );

}

