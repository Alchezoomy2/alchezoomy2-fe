import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default function snackBar() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const openSnackbar = (incomingSeverity = "success", incomingMessage = "") => {
        console.log("🚀 ~ file: SnackBar.jsx ~ line 16 ~ openSnackbar ~ incomingSeverity", incomingSeverity);
        console.log("🚀 ~ file: SnackBar.jsx ~ line 16 ~ openSnackbar ~ incomingMessage", incomingMessage);
        setSnackbarOpen(true);
        setSeverity(incomingSeverity);
        setMessage(incomingMessage);
    };


    const SnackbarComponent = () => (
        <Snackbar
            autoHideDuration={5000}
            open={snackbarOpen}
            onClose={handleSnackbarClose} >
            <Alert
                onClose={handleSnackbarClose}
                severity={severity}>
                {message}
            </Alert>
        </Snackbar >
    );

    return { openSnackbar, SnackbarComponent };

}