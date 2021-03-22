import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

export const NewAdminDialog = ({ handleClose, newUserDialogOpen }) => {
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newUserName, setNewUserName] = useState("");


    const handleCloseLocal = (e) => {
        e.preventDefault();
        handleClose(newUserName, newPassword1);
    };


    return useObserver(() => {
        <Dialog
            open={newUserDialogOpen}
        >
            <DialogTitle id="password-update-dialog-title">
                You are a new admin, please create a new password.
        </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="User Name"
                    type="text"
                    onChange={({ target }) => setNewUserName(target.value)}
                    required
                />
                <TextField
                    autoFocus
                    label="Password"
                    type="password"
                    onChange={({ target }) => setNewPassword1(target.value)}
                    error={newPassword1 !== newPassword2}
                    required
                />
                <TextField
                    autoFocus
                    label="Password"
                    type="password"
                    onChange={({ target }) => setNewPassword2(target.value)}
                    error={newPassword1 !== newPassword2}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseLocal}
                >
                    SUBMIT
            </Button>
            </DialogActions>
        </Dialog>;

    });
};