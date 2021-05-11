import React, { useEffect, useState } from "react";
import { Paper, TextField, Button, Backdrop, CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import snackBar from "../../../hooks/snackBar/snackBar";
import usePasswordMeter from "../../../hooks/usePasswordMeter/usePasswordMeter";
import { useStyles } from "./StudentChangePasswordStyles";
import LandingPageAppBar from "../../Shared/LandingPageAppBar/LandingPageAppBar";
import { getStudentInfo, studentChangePassword } from "../../../utils/student-fetches/auth-fetches";



export default function StudentChangePassword() {
    const history = useHistory();
    const { jwt } = useParams();
    const classes = useStyles();
    const { checkPasswordStrength, PasswordMeterComponent } = usePasswordMeter();
    const [open, setOpen] = useState(true);
    const [studentInfo, setStudentInfo] = useState({});

    const { openSnackbar, SnackbarComponent } = snackBar();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);


    useEffect(() => {
        const checkStudent = async () => {
            const response = await getStudentInfo(jwt);
            setStudentInfo(response);
            setOpen(false);
        };

        checkStudent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordStrength > 2) {
            const { code, message } = await studentChangePassword(studentInfo.id, password1);

            openSnackbar(code, message);
            history.push("/student/login");
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
                        onSubmit={handleSubmit}
                        className={classes.passwordForm}>
                        <TextField
                            id="studentEmail"
                            variant="outlined"
                            value={studentInfo.studentEmail}
                            disabled
                        />
                        <TextField
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
            <Backdrop
                className={classes.backdrop}
                open={open}>
                <CircularProgress />
            </Backdrop>
            <SnackbarComponent />
        </>
    );
}