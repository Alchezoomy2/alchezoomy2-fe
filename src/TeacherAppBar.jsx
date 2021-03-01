import React from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react";
import { useHistory } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";

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
    userInfo: {
        flexGrow: 1,
        display: "flex"
    },
    teacherName: {
        marginLeft: "5px"
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


export const TeacherAppBar = ({ handleSubscriptionDashboard, handleLectureDashboard }) => {
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
                <div className={classes.userInfo}>
                    <Avatar
                        alt={store.teacherInfo.userName}
                        src={store.teacherInfo.picUrl}
                        edge="start"
                    />
                    <Typography
                        className={classes.teacherName}>
                        {store.teacherInfo.userName}
                    </Typography>
                </div>
                <ButtonGroup
                    color="primary"
                    aria-label="teacher button group">
                    <Button
                        onClick={handleLectureDashboard}
                    >Lectures</Button>
                    <Button
                        onClick={handleSubscriptionDashboard}
                    >Subscriptions</Button>
                    <Button
                        onClick={() => handleLogout()}
                    >
                        LOGOUT
                </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar >
    );
};

TeacherAppBar.propTypes = {
    handleSnackbarOpen: PropTypes.func
};
