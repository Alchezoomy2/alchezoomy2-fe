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
        padding: "5px"
    },
    textField: {

        marginLeft: "15px",
        width: "500px"
    },
    input: {
        color: "white",
        borderColor: "white"
    },
    teacherName: {
        marginLeft: "5px"
    },
    searchBar: {
        flexGrow: 1
    },
    notchedOutline: {
        borderWidth: ".5px",
        borderColor: "white !important"
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: "white !important",
        }
    },
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
                <div className={classes.searchBar}>
                    <TextField
                        // variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            classes: {
                                root: classes.input,
                                focused: {}
                            }
                        }}
                        InputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline,
                                root: classes.cssOutlinedInput,
                                focused: classes.input
                            }
                        }}
                        label="invite"
                        defaultValue="Student email"
                        value={studentEmail}
                        onChange={({ target }) => handleEmailChange(target.value)}
                    />
                    <IconButton
                        color="inherit"
                        onClick={() => handleStudentInvite()}>
                        <MailIcon />
                    </IconButton>
                </div>
                <Button
                    // variant="outlined"
                    color="inherit"
                    onClick={() => handleLogout()}
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
