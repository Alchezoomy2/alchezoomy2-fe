import React, { useState } from "react";
import { AppBar, Avatar, Typography, Toolbar, IconButton, InputBase } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    }
}));

export const TeacherAppBar = () => {
    const store = useStateStore();
    const classes = useStyles();
    const [studentEmail, setStudentEmail] = useState("");

    const handleEmailChange = (value) => {
        setStudentEmail(value);
        console.log(value);
    };

    const handleStudentInvite = () => {
        console.log("CLICK");
        console.log(studentEmail);
    };

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
                <InputBase
                    placeholder="Invite student via email"
                    onChange={({ target }) => handleEmailChange(target.value)}
                />
                <IconButton
                    color="inherit"
                    onClick={() => handleStudentInvite()}
                >
                    <MailIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};