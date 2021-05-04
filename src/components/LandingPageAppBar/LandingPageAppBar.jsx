import React from "react";
import { Toolbar, AppBar, Typography } from "@material-ui/core";
import useStyles from "./LandingPageAppBarStyles";

export default function LandingPageAppBar() {
    const classes = useStyles();

    return (
        <AppBar
            position="static"
            className={classes.appBar}>
            <Toolbar>
                <Typography>
                    Alchemy Lectures
                </Typography>
            </Toolbar>
        </AppBar>
    );
}