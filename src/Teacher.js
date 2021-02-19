import React, { useState, useEffect } from "react";
import { useStateStore } from "./StoreProvider.js";
import { useObserver } from "mobx-react";
import { TeacherCreator } from "./TeacherCreator";
import { TeacherDashboard } from "./TeacherDashboard";
import { fetchAllTeacherMeetings } from "./utils/teacher-fetches/meeting-fetches.js";
import { createTeacher } from "./utils/teacher-fetches/auth-fetches";
import { TeacherAppBar } from "./TeacherAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
    backdrop: {
        zIndex: 5
    }
});

export const Teacher = () => {
    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    let [open, setOpen] = useState(true);
    const store = useStateStore();
    const [snackbarOpen, setSnackbarOpen] = useState(false);



    const handleCreateTeacher = async (selectedColor) => {
        setOpen(true);
        const returnedTeacherInfo = await createTeacher({ ...store.teacherInfo, color: selectedColor });
        store.changeTeacherInfo(returnedTeacherInfo);
        const returnedMeetingArray = await fetchAllTeacherMeetings(returnedTeacherInfo);
        store.changeMeetingsObj(returnedMeetingArray);
        setDisplayModule(<TeacherDashboard
            setOpen={setOpen}
        />);
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };


    useEffect(async () => {

        if (store.teacherInfo.newUser) {
            setDisplayModule(<TeacherCreator
                handleCreateTeacher={handleCreateTeacher}
            />);
        } else {
            const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
            store.changeMeetingsObj(returnedMeetingArray);
            setDisplayModule(<TeacherDashboard
                setOpen={setOpen}
                handleSnackbarClose={handleSnackbarClose}
                snackbarOpen={snackbarOpen}
            />);
        }

        setOpen(false);
    }, [setOpen]);



    return useObserver(() =>
        <div>
            <Grid>
                <TeacherAppBar
                    handleSnackbarOpen={handleSnackbarOpen}
                />
                {displayModule}
                <Backdrop
                    className={classes.backdrop}
                    open={open}>
                    <CircularProgress />
                </Backdrop>
            </Grid>
        </div>

    );
};

export default Teacher;
