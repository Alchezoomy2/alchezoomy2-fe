import React from "react";
import { AppBar, Typography, Button, ButtonGroup, Toolbar } from "@material-ui/core";
import { useStateStore } from "../../../utils/StoreProvider";
import { useStyles } from "./AdminAppBarStyles";
import { useHistory } from "react-router-dom";
import { PropTypes } from "mobx-react";

export default function AdminAppBar({ handleTeacherDashboard, handleStudentDashboard, handleBucketDashboard }) {
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = () => {
        store.changeLoggedOut();
        localStorage.clear();
        history.push("/admin/login");
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <div className={classes.userInfo}>
                    <Typography
                        className={classes.adminName}>
                        ADMIN
                    </Typography>
                </div>
                <ButtonGroup
                    color="inherit"
                    aria-label="admin-button-group">
                    <Button
                        onClick={handleBucketDashboard}
                    >
                        S3 CONFIG
                    </Button>
                    <Button
                        onClick={handleTeacherDashboard}
                    >
                        TEACHERS
                    </Button>
                    <Button
                        onClick={handleStudentDashboard}
                    >
                        STUDENTS
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
}

AdminAppBar.propTypes = {
    handleBucketDashboard: PropTypes.func,
    handleTeacherDashboard: PropTypes.func,
    handleStudentDashboard: PropTypes.func
};
