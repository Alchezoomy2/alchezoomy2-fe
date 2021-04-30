import React from "react";
import { AppBar, Avatar, Typography, Toolbar, Button, ButtonGroup } from "@material-ui/core";
import { useStateStore } from "../../utils/StoreProvider.js";
import { useStyles } from "./TeacherAppBarStyles";
import { PropTypes } from "mobx-react";
import { useHistory } from "react-router-dom";


export const TeacherAppBar = ({ handleSubscriptionDashboard, handleLectureDashboard, handleAvatarClick }) => {
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = () => {
        store.changeLoggedOut();
        history.push("/");
    };


    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <div className={classes.userInfo}>
                    <Avatar
                        alt={store.teacherInfo.userName}
                        src={store.teacherInfo.picUrl}
                        edge="start"
                        onClick={handleAvatarClick}
                        className={classes.avatar}
                    />
                    <Typography
                        className={classes.teacherName}>
                        {store.teacherInfo.userName}
                    </Typography>
                </div>
                <ButtonGroup
                    color="inherit"
                    aria-label="teacher button group">
                    <Button
                        onClick={handleLectureDashboard}
                    >
                        Lectures
                    </Button>
                    <Button
                        onClick={handleSubscriptionDashboard}
                    >Subscriptions</Button>
                    <Button
                        variant="contained"
                        color="secondary"
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
