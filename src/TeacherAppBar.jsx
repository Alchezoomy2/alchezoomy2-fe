import React, { useState } from "react";
import { AppBar, Avatar, Typography, Toolbar, IconButton, TextField, Button } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/styles";
import { inviteStudent } from "./utils/teacher-fetches/auth-fetches";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    input: {
        color: "white",
        marginLeft: "15px",
        width: "500px"
    },
    teacherName: {
        marginLeft: "5px"
    }
}));


export const TeacherAppBar = ({ handleSnackbarOpen }) => {
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();
    const [studentEmail, setStudentEmail] = useState("");
    // const [validInput, setValidInput] = useState(true);

    const handleLogout = () => {
        store.changeLoggedIn();
        history.push("/");
    };


    const handleEmailChange = (value) => {
        console.log(value);
        setStudentEmail(value);
    };

    const handleStudentInvite = async () => {
        console.log(`invite! ${studentEmail}`);
        if (studentEmail.includes("@") && studentEmail.includes(".")) {
            await inviteStudent(studentEmail, store.teacherInfo);
            setStudentEmail("");
            handleSnackbarOpen();
        }
    };

    return useObserver(() =>
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Avatar
                    alt={store.teacherInfo.userName}
                    src={store.teacherInfo.picUrl}
                    edge="start"
                />
                <Typography
                    className={classes.teacherName}>
                    {store.teacherInfo.userName}
                </Typography>
                <TextField
                    className={classes.input}
                    color="inherit"
                    label="Student email"
                    value={studentEmail}
                    onChange={({ target }) => handleEmailChange(target.value)}
                />
                <IconButton
                    color="inherit"
                    onClick={() => handleStudentInvite()}>
                    <MailIcon />
                </IconButton>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleLogout()}
                    edge="end"
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
};

TeacherAppBar.propTypes = {
    handleSnackbarOpen: PropTypes.func
};
