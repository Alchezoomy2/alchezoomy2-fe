import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import useStyles from "./FooterStyles";


export default function Footer() {
    const classes = useStyles();

    return (
        <AppBar
            variant="static"
            className={classes.root}
            color="primary">
            <Toolbar variant="dense" className={classes.frame}>
                <Typography variant="Button">
                    Designed by Paul Stevens
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="email designer">
                    <MailIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}