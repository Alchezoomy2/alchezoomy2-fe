import React from "react";
import { useObserver } from "mobx-react";
import { useStateStore } from "./StoreProvider.js";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./styles/landingPage.js";
const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;



export const LandingPage = () => {
    const store = useStateStore();
    const classes = useStyles();

    return useObserver(() =>
        <Paper elevation={3} className={classes.root}>
            <div>
                <Paper elevation={2}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.jpg"
                        alt="logo image" />
                </Paper>
            </div>
            <div>
                <Button
                    // className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        store.changeUserType("teacher");
                        window.location.href = zoomAPIurl;
                    }}>
                    Teacher
                </Button>
                <Button
                    // className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        store.changeUserType("student");
                        window.location.href = zoomAPIurl;
                    }}>
                    Student
            </Button>
            </div>
        </Paper>
    );
};

export default LandingPage;
