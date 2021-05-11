import React from "react";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./TeacherInviteStyles";
import { useParams } from "react-router-dom";
import LandingPageAppBar from "../../Shared/LandingPageAppBar/LandingPageAppBar";

const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export default function TeacherInvite() {
    const classes = useStyles();
    const { jwt } = useParams();

    return (
        <>
            <LandingPageAppBar />
            <Paper
                elevation={3}
                className={classes.root}>
                <div
                    className={classes.welcomeFrame}>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo"
                        />
                    </Paper>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => window.location.href = zoomAPIurl + `&state=${jwt}`}
                        >
                            SIGN IN WITH ZOOM
                    </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
}