import React, { useState } from "react";
import { Paper, TextField, Snackbar, Button, Typography } from "@material-ui/core";
import { useStyles } from "./AdminLoginStyles.js";
import { adminAuth, adminSetupPassword } from "../../utils/admin-fetches/auth-fetches.js";
import { useStateStore } from "../../utils/StoreProvider";
import { NewAdminDialog } from "../NewAdminDialog/NewAdminDialog.jsx";
import { useHistory } from "react-router-dom";
import LandingPageAppBar from "../LandingPageAppBar/LandingPageAppBar";


export default function AdminLogin() {
    const history = useHistory();
    const classes = useStyles();
    const store = useStateStore();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
    const [invalidLoginOpen, setInvalidLoginOpen] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminInfo = await adminAuth(userName, password);
        if (adminInfo.status === "new") {
            setNewUserDialogOpen(true);
            setPassword("");
        } else if (adminInfo.status === "false") {
            setInvalidLoginOpen(true);
            setPassword("");
        } else if (adminInfo.status === "success") {
            store.changeLoggedIn();
            history.push("/admin/dashboard");
        }
    };

    const handleClose = async (newPassword1) => {
        const adminInfo = await adminSetupPassword(userName, newPassword1);
        await store.changeAdminInfo(adminInfo);
        setNewUserDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setInvalidLoginOpen(false);
    };

    return (
        <>
            <LandingPageAppBar />
            <Paper elevation={3}
                className={classes.root}>
                <div
                    className={classes.welcomeFrame}>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo" />
                    </Paper>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes.loginForm}
                >
                    <Typography
                        variant="h5">
                        Student Sign In
                        </Typography>
                    <TextField
                        id="userName"
                        label="User Name"
                        value={userName}
                        onChange={({ target }) => setUserName(target.value)}
                        autocomplete="off"
                        variant="outlined"
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        autocomplete="current-password"
                        type="password"
                        variant="outlined"
                        required
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary">
                        SUBMIT
                    </Button>
                </form>
            </Paper>
            <NewAdminDialog
                handleClose={handleClose}
                newUserDialogOpen={newUserDialogOpen}
                userName={userName}
            />
            <Snackbar
                open={invalidLoginOpen}
                message="Invalid Username or Password"
                onClose={handleSnackbarClose}
            />
        </>
    );

}

