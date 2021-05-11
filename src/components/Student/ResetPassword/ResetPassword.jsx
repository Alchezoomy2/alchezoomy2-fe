import React, { useState } from "react";
import LandingPageAppBar from "../../Shared/LandingPageAppBar/LandingPageAppBar";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { useStyles } from "./ResetPasswordStyles";
import snackBar from "../../../hooks/snackBar/snackBar";
import { studentResetPassword } from "../../../utils/student-fetches/auth-fetches";

export default function ResetPassword() {
    const classes = useStyles();
    const [studentEmail, setStudentEmail] = useState("");
    const { openSnackbar, SnackbarComponent } = snackBar();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { code, message } = await studentResetPassword(studentEmail.toLowerCase().trim());
            openSnackbar(code, message);
            localStorage.clear();
            setStudentEmail("");
        } catch (e) {
            openSnackbar("error", e.message);
        }
    };

    return (
        <>
            <LandingPageAppBar />
            <Paper
                elevation={3}
                className={classes.root}>
                <div
                    classNane={classes.welcomeFrame}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo"
                    />
                    <form
                        onSubmit={handleSubmit}
                        className={classes.resetForm}
                    >
                        <Typography
                            variant="h5">
                            Reset Your Password
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
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary">
                            RESET
                        </Button>
                    </form>
                </div>
            </Paper>
            <SnackbarComponent />
        </>
    );

}