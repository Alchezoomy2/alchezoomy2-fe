import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default function AdminSnackBar() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const openSnackbar = (incomingSeverity = "success", incomingMessage = "") => {
        setSnackbarOpen(true);
        setSeverity(incomingSeverity);
        setMessage(incomingMessage);
    };


    const SnackbarComponent = (
        <Snackbar
            autoHideDuration={5000}
            open={snackbarOpen}
            onClose={handleSnackbarClose}>
            <Alert
                onClose={handleSnackbarClose}
                severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );

    return { openSnackbar, SnackbarComponent };

}