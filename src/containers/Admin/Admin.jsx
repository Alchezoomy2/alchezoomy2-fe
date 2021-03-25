import React, { useState } from "react";
import AdminAppBar from "../../components/AdminAppBar/AdminAppBar";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { fetchAllTeachers } from "../../utils/admin-fetches/teacher-fetches";
import AdminTeacherDashboard from "../../components/AdminTeacherDashboard/AdminTeacherDashboard";
import useStyles from "./AdminStyles.js";
import { fetchAllStudents } from "../../utils/admin-fetches/student-fetches";
import AdminStudentDashboard from "../../components/AdminStudentDashboard/AdminStudentDashboard";
import { fetchS3Obj } from "../../utils/admin-fetches/s3-fetches";
import AdminBucketDashboard from "../../components/AdminBucketDashboard/AdminBucketDashboard";
import AdminSnackBar from "../../components/AdminSnackbar/AdminSnackBar";


export default function Admin() {
    const { openSnackbar, SnackbarComponent } = AdminSnackBar();
    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    const [open, setOpen] = useState(false);

    const handleTeacherDashboard = async () => {
        setOpen(true);
        const returnedTeacherArray = await fetchAllTeachers();
        setDisplayModule(<AdminTeacherDashboard
            returnedTeacherArray={returnedTeacherArray}
            openSnackbar={openSnackbar}
        />);
        setOpen(false);
    };

    const handleStudentDashboard = async () => {
        setOpen(true);
        const returnedStudentArray = await fetchAllStudents();
        setDisplayModule(<AdminStudentDashboard
            returnedStudentArray={returnedStudentArray}
            openSnackbar={openSnackbar}
        />
        );
        setOpen(false);
    };

    const handleBucketDashboard = async () => {
        setOpen(true);
        const returnedS3Obj = await fetchS3Obj();
        console.log("🚀 ~ file: Admin.jsx ~ line 45 ~ handleS3Dashboard ~ returnedS3Obj", returnedS3Obj);

        setDisplayModule(<AdminBucketDashboard
            returnedS3Obj={returnedS3Obj}
            openSnackbar={openSnackbar}
        />
        );

        setOpen(false);
    };


    return <div>
        <Grid>
            <AdminAppBar
                handleTeacherDashboard={handleTeacherDashboard}
                handleStudentDashboard={handleStudentDashboard}
                handleBucketDashboard={handleBucketDashboard}
            />
            {displayModule}
            <Backdrop
                className={classes.backdrop}
                open={open}>
                <CircularProgress />
            </Backdrop>
        </Grid>
        <SnackbarComponent />
    </div>;
}
