import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { useStyles } from "./TeacherLoginStyles";
import LandingPageAppBar from "../LandingPageAppBar/LandingPageAppBar";

const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export default function TeacherLogin() {
    const classes = useStyles();

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
                        Teacher Sign In
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => window.location.href = zoomAPIurl}
                    >
                        SIGN IN WITH ZOOM
                    </Button>
                </div>
            </Paper>
        </>
    );
}