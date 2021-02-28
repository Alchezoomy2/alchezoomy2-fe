import React from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: "5px"
    },
    textField: {
        backgroundColor: "rgba(255, 255, 255, 0.10)",
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


export const TeacherAppBar = ({ handleSubscriptionDashboard }) => {
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = () => {
        store.changeLoggedIn();
        history.push("/");
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
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleSubscriptionDashboard}
                >Subscriptions</Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleLogout()}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar >
    );
};

TeacherAppBar.propTypes = {
    handleSnackbarOpen: PropTypes.func
};
