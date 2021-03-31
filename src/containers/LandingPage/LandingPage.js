import React from "react";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./LandingPageStyles.js";

export const LandingPage = () => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <div>
                <Paper elevation={2}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo image" />
                </Paper>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        window.location.href = "/student/login";
                    }}>
                    Student
            </Button>
            </div>
        </Paper>
    );
};

export default LandingPage;
