import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useStyles } from "./StudentLoginStyles.js";
import { studentAuth } from "../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import snackBar from "../../components/snackBar/snackBar";


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
            console.log(studentInfo);
            if (studentInfo !== error) {
                store.changeStudentInfo(studentInfo);

                const newMeetingObj = await fetchAllStudentMeetings();
                console.log("🚀 ~ file: StudentLogin.jsx ~ line 26 ~ handleSubmit ~ newMeetingObj", newMeetingObj);

                store.changeMeetingsObj(newMeetingObj);
                store.changeLoggedIn();
                history.push("/student");
            }
            openSnackbar("error", "Invalid username or password");
            setPassword("");
        } catch (error) {

            openSnackbar("error", "Invalid username or password");
            setPassword("");
        }

    };

    return (
        <div>
            <Paper elevation={3}>
                <div>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo" />
                    </Paper>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes.loginForm}
                >
                    <TextField
                        id="studentEmail"
                        label="Email"
                        value={studentEmail}
                        onChange={({ target }) => setStudentEmail(target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        required
                    />
                    <Button type="submit">SUBMIT</Button>
                </form>
            </Paper>
            <SnackbarComponent />
        </div>
    );

}

