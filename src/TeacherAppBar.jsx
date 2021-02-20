import React, { useState } from "react";
import { AppBar, Avatar, Typography, Toolbar, IconButton, TextField, FormControl } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/styles";
import { inviteStudent } from "./utils/teacher-fetches/auth-fetches";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react";



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
    const [studentEmail, setStudentEmail] = useState("");
    // const [validInput, setValidInput] = useState(true);

    const handleEmailChange = (value) => {
        setStudentEmail(value);
    };

    const handleStudentInvite = async () => {
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
                <FormControl>
                    <TextField
                        color="text"
                        variant="outlined"
                        placeholder="Invite student via email"
                        label="Student email"
                        value={studentEmail}
                        onChange={({ target }) => handleEmailChange(target.value)}
                    />
                    <IconButton color="inherit" onSubmit={() => handleStudentInvite()}>
                        <MailIcon />
                    </IconButton>
                </FormControl>
            </Toolbar>
        </AppBar>
    );
};

TeacherAppBar.propTypes = {
    handleSnackbarOpen: PropTypes.func
};
