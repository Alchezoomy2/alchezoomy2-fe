import React, { useState } from "react";
import AdminAppBar from "../../components/AdminAppBar/AdminAppBar";
import { Grid, Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { fetchAllTeachers } from "../../utils/admin-fetches/teacher-fetches";
import AdminTeacherDashboard from "../../components/AdminTeacherDashboard/AdminTeacherDashboard";
import useStyles from "./AdminStyles.js";
import { Alert } from "@material-ui/lab";
import { fetchAllStudents } from "../../utils/admin-fetches/student-fetches";
import AdminStudentDashboard from "../../components/AdminStudentDashboard/AdminStudentDashboard";
import { fetchS3Obj } from "../../utils/admin-fetches/s3-fetches";
import AdminBucketDashboard from "../../components/AdminS3Dashboard/AdminS3Dashboard";


export default function Admin() {

    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleTeacherDashboard = async () => {
        setOpen(true);
        const returnedTeacherArray = await fetchAllTeachers();
        setDisplayModule(<AdminTeacherDashboard
            returnedTeacherArray={returnedTeacherArray}
            handleSnackbarOpen={handleSnackbarOpen}
        />);
        setOpen(false);
    };

    const handleStudentDashboard = async () => {
        setOpen(true);
        const returnedStudentArray = await fetchAllStudents();
        setDisplayModule(<AdminStudentDashboard
            returnedStudentArray={returnedStudentArray}
            handleSnackbarOpen={handleSnackbarOpen}
        />
        );
        setOpen(false);
    };

    const handleS3Dashboard = async () => {
        setOpen(true);
        const returnedS3Obj = await fetchS3Obj();
        console.log("🚀 ~ file: Admin.jsx ~ line 45 ~ handleS3Dashboard ~ returnedS3Obj", returnedS3Obj);

        setDisplayModule(<AdminBucketDashboard />
        );

        setOpen(false);
    };

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
