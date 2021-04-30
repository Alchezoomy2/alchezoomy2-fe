import React from "react";
import { Appbar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { useStyles } from "./FooterStyles";


export default function Footer() {
    const classes = useStyles();

    return (
        <Appbar
            variant="static"
            className={classes.root}
            color="primary">
            <Toolbar variant="dense">
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
        </Appbar>
    );
}