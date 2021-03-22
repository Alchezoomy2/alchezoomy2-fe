import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { useStyles } from "./NewAdminDialogStyles.js";

export const NewAdminDialog = ({ handleClose, newUserDialogOpen }) => {
    const classes = useStyles();
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newUserName, setNewUserName] = useState("");


    const handleCloseLocal = (e) => {
        e.preventDefault();
        handleClose(newUserName, newPassword1);
    };


    return (
        <Dialog
            open={newUserDialogOpen}
        >
            <DialogTitle id="password-update-dialog-title">
                You are a new admin, please create a new password.
        </DialogTitle>
            <DialogContent
                className={classes.root}>
                <form>
                    <TextField
                        className={classes.field}
                        autoFocus
                        label="User Name"
                        type="text"
                        onChange={({ target }) => setNewUserName(target.value)}
                        required
                    />
                    <TextField
                        className={classes.field}
                        label="Password"
                        type="password"
                        onChange={({ target }) => setNewPassword1(target.value)}
                        error={newPassword1 !== newPassword2}
                        required
                    />
                    <TextField
                        className={classes.field}
                        label="Password"
                        type="password"
                        onChange={({ target }) => setNewPassword2(target.value)}
                        error={newPassword1 !== newPassword2}
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseLocal}
                >
                    SUBMIT
            </Button>
            </DialogActions>
        </Dialog>

    );
};

NewAdminDialog.propTypes = {
    handleClose: PropTypes.func,
    newUserDialogOpen: PropTypes.func
};