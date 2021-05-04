import React from "react";
import { Toolbar, AppBar } from "@material-ui/core";
import useStyles from "./LandingPageAppBarStyles";

export default function LandingPageAppBar() {
    const classes = useStyles();

    return (
        <AppBar
            position="static"
            className={classes.appBar}>
            <Toolbar />
        </AppBar>
    );
}