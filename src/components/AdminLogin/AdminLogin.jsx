import React, { useState } from "react";
import { Paper, TextField, Snackbar, Button } from "@material-ui/core";
import { useStyles } from "./AdminLoginStyles.js";
import { adminAuth, adminSetupPassword } from "../../utils/admin-fetches/auth-fetches.js";
import { useStateStore } from "../../StoreProvider";
import { NewAdminDialog } from "../NewAdminDialog/NewAdminDialog.jsx";
import { useHistory } from "react-router-dom";


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
            setUserName("");
            setPassword("");
        } else if (adminInfo.status === "false") {
            setInvalidLoginOpen(true);
            setPassword("");
        } else if (adminInfo.status === "success") {
            console.log(adminInfo);
            store.changeLoggedIn();
            history.push("/admin/dashboard");
        }
    };

    const handleClose = async (newUserName, newPassword1) => {
        const adminInfo = await adminSetupPassword(newUserName, newPassword1);
        await store.changeAdminInfo(adminInfo);
        setNewUserDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setInvalidLoginOpen(false);
    };


    return (
        <div>
            <Paper elevation={3}>
                <div>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo image" />
                    </Paper>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes.loginForm}
                >
                    <TextField
                        id="userName"
                        label="User Name"
                        value={userName}
                        onChange={({ target }) => setUserName(target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        required
                    />
                    <Button type="submit">SUBMIT</Button>
                </form>
            </Paper>
            <NewAdminDialog
                handleClose={handleClose}
                newUserDialogOpen={newUserDialogOpen}
            />
            <Snackbar
                open={invalidLoginOpen}
                message="Invalid Username or Password"
                onClose={handleSnackbarClose}
            />
        </div>
    );

}
