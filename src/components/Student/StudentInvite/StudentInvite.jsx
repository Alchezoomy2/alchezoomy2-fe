import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@material-ui/core";
import { useStyles } from "./StudentInviteStyles";
import { createStudent, studentExists } from "../../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../../utils/StoreProvider";
import { useHistory } from "react-router-dom";
import usePasswordMeter from "../../../hooks/usePasswordMeter/usePasswordMeter";
import snackBar from "../../../hooks/snackBar/snackBar";
import LandingPageAppBar from "../../Shared/LandingPageAppBar/LandingPageAppBar";
import Footer from "../../Shared/Footer/Footer";



export default function StudentInvite() {
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const { checkPasswordStrength, PasswordMeterComponent } = usePasswordMeter();
    const { openSnackbar, SnackbarComponent } = snackBar();
    const [firstName, setFirstName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [studentInfo, setStudentInfo] = useState({});
    const store = useStateStore();
    const { jwt } = useParams();
    const classes = useStyles();


    useEffect(() => {
        const checkStudent = async () => {
            const response = await studentExists(jwt);
            const { status } = response;

            if (status === "existing") {
                history.push("/student/login");
            } else {
                setStudentInfo(response);
                setOpen(true);
            }
        };

        checkStudent();
    }, []);

    const handleSubmit = async (e, studentEmail, teacherEmail) => {
        e.preventDefault();

        if (passwordStrength > 2) {
            const studentInfo = await createStudent(studentEmail, teacherEmail, password1, firstName);
            if (studentInfo) {
                store.changeStudentInfo(studentInfo);
                const newMeetingsObj = await fetchAllStudentMeetings();
                store.changeMeetingsObj(newMeetingsObj);
                store.changeLoggedIn();
                history.push("/student/");
            }
        } else {
            openSnackbar("warning", "Password Must Be More Complex!");
        }
    };

    const handlePassword1Change = ({ target }) => {
        setPassword1(target.value);
        setPasswordStrength(checkPasswordStrength(target.value));
    };

    const handlePassword2Change = ({ target }) => {
        setPassword2(target.value);
        setPasswordStrength(checkPasswordStrength(target.value));
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
                        alt="logo" />
                    <form
                        onSubmit={(e) => handleSubmit(e, studentInfo.studentEmail, studentInfo.teacherEmail)}
                        className={classes.signupForm}>
                        <Typography
                            variant="button">
                            Student Creator
                        </Typography>
                        <TextField
                            className={classes.textField}
                            id="studentEmail"
                            variant="outlined"
                            value={studentInfo.studentEmail}
                            disabled
                        />
                        <TextField
                            className={classes.textField}
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                            required
                        />
                        <TextField
                            className={classes.textField}
                            id="password1"
                            label="Password"
                            value={password1}
                            onChange={handlePassword1Change}
                            type="password"
                            autocomplete="new-password"
                            error={password1 !== password2}
                            required
                        />
                        <TextField
                            className={classes.textField}
                            id="password2"
                            label="Password"
                            value={password2}
                            onChange={handlePassword2Change}
                            type="password"
                            autocomplete="new-password"
                            error={password1 !== password2}
                            required
                        />
                        <PasswordMeterComponent />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                            SUBMIT
                        </Button>
                    </form>
                </div>
            </Paper>
            <Footer />
            <Backdrop
                className={classes.backdrop}
                open={open}>
                <CircularProgress />
            </Backdrop>
            <SnackbarComponent />
        </>
    );

}

