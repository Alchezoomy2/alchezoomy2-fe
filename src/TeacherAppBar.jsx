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
    email: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    ));


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
                <div className={classes.email}>
                    <div className={classes.searchIcon}>
                        <MailIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {/* // label="invite"
                    //     onChange={({ target }) => handleEmailChange(target.value)}
                    // /> */}
                {/* <IconButton
                    color="inherit"
                    onClick={() => handleStudentInvite()}>
                    <MailIcon />
                </IconButton> */}
                {/* </div> */}
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
