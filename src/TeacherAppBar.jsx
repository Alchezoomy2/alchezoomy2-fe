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
    const [validInput, setValidInput] = useState(true);

    const handleEmailChange = (value) => {
        setStudentEmail(value);
        console.log(value);
    };

    const handleStudentInvite = () => {
        if (studentEmail.includes("@") && studentEmail.includes(".")) {
            console.log("CLICK");
            console.log(studentEmail);
        } else {
            setValidInput(false);
        }
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
                    error={!validInput}
                    variant="outlined"
                    placeholder="Invite student via email"
                    helperText="invalid email format"
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