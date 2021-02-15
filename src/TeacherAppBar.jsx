import React from "react";
import { AppBar, Avatar, Typography, Toolbar, IconButton } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import MailIcon from "@material-ui/icons/Mail";
import makeStyles from "@material-ui/styles";

const useStyles = makeStyles(() => {
    {
        1;
    }
});

export const TeacherAppBar = () => {
    const store = useStateStore();
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Avatar
                    alt={store.teacherInfo.userName}
                    src={store.teacherInfo.picUrl}
                    edge="start"
                />
                <Typography>
                    {store.teacherInfo.userName}
                </Typography>
                <IconButton color="inherit">
                    <MailIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};