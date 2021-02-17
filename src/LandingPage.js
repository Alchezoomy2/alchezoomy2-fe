import React from "react";
import { useObserver } from "mobx-react";
import { useStateStore } from "./StoreProvider.js";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./styles/page.js";
const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;



export const LandingPage = () => {
    const store = useStateStore();
    const classes = useStyles();

    return useObserver(() =>
        <Paper elevation={3} className={classes.root}>
            <Button
                onClick={() => {
                    store.changeUserType("teacher");
                    window.location.href = zoomAPIurl;
                }}>
                Teacher
            </Button>
            <Button
                onClick={() => {
                    store.changeUserType("student");
                    window.location.href = zoomAPIurl;
                }}>
                Student
            </Button>
        </Paper>
    );
};

export default LandingPage;