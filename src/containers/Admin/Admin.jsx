import React, { useState, useEffect } from "react";
import AdminAppBar from "../../components/Admin/AdminAppBar/AdminAppBar";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { fetchAllTeachers } from "../../utils/admin-fetches/teacher-fetches";
import AdminTeacherDashboard from "../../components/Admin/AdminTeacherDashboard/AdminTeacherDashboard";
import useStyles from "./AdminStyles.js";
import { fetchAllStudents } from "../../utils/admin-fetches/student-fetches";
import AdminStudentDashboard from "../../components/Admin/AdminStudentDashboard/AdminStudentDashboard";
import { fetchS3Obj } from "../../utils/admin-fetches/s3-fetches";
import AdminBucketDashboard from "../../components/Admin/AdminBucketDashboard/AdminBucketDashboard";
import snackBar from "../../hooks/snackBar/snackBar";
import Footer from "../../components/Shared/Footer/Footer";


export default function Admin() {
    const { openSnackbar, SnackbarComponent } = snackBar();
    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    const [open, setOpen] = useState(false);

    const handleTeacherDashboard = async () => {
        setOpen(true);
        const returnedTeacherArray = await fetchAllTeachers();
        setDisplayModule(<AdminTeacherDashboard
            returnedTeacherArray={returnedTeacherArray}
            openSnackbar={openSnackbar}
            setOpen={setOpen}
        />);
        setOpen(false);
    };

    const handleStudentDashboard = async () => {
        setOpen(true);
        const returnedStudentArray = await fetchAllStudents();
        setDisplayModule(<AdminStudentDashboard
            returnedStudentArray={returnedStudentArray}
            openSnackbar={openSnackbar}
            setOpen={setOpen}
        />
        );
        setOpen(false);
    };

    const handleBucketDashboard = async () => {
        setOpen(true);
        const returnedS3Obj = await fetchS3Obj();

        setDisplayModule(<AdminBucketDashboard
            returnedS3Obj={returnedS3Obj}
            openSnackbar={openSnackbar}
        />
        );

        setOpen(false);
    };

    useEffect(() => {
        handleTeacherDashboard();
    }, []);


    return <div>
        <Grid>
            <AdminAppBar
                handleTeacherDashboard={handleTeacherDashboard}
                handleStudentDashboard={handleStudentDashboard}
                handleBucketDashboard={handleBucketDashboard}
            />
            {displayModule}
            <Footer />
        </Grid>
        <Backdrop
            className={classes.backdrop}
            open={open}>
            <CircularProgress />
        </Backdrop>
        <SnackbarComponent />
    </div>;
}
