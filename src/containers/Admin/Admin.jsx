import React, { useState, useEffect } from "react";
import { useStateStore } from "./StoreProvider";
import { AdminAppBar } from "../../components/AdminAppBar/AdminAppBar";
import { Grid, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { fetchAllTeachers } from "../../utils/admin-fetches/teacher-fetches";
import { AdminTeacherDashboard } from "../../components/AdminTeacherDashboard";
import { useStyles } from "./AdminStyles.js";
import { Alert } from "@material-ui/lab";


export default function Admin() {

    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [open, setOpen] = useState(true);

    const handleTeacherDashboard = async () => {
        setOpen(true);
        const returnedTeacherArray = await fetchAllTeachers();
        setDisplayModule(<AdminTeacherDashboard
            returnedTeacherArray={returnedTeacherArray}
            handleSnackbarOpen={handleSnackbarOpen}
        />);
        setOpen(false);
    };

    const handleStudentDashboard = () => { };

    const handleS3Dashboard = () => { };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    return <div>
        <Grid>
            <AdminAppBar
                handleTeacherDashboard={handleTeacherDashboard}
                handleStudentDashboard={handleStudentDashboard}
                handleS3Dashboard={handleS3Dashboard}
            />
            {displayModule}
            <Backdrop
                className={classes.backdrop}
                open={open}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                autoHideDuration={5000}
                open={snackbarOpen}
                onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success">
                    Email sent!
                        </Alert>
            </Snackbar>
        </Grid>
    </div>;
}