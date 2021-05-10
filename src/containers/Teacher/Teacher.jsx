import React, { useState, useEffect } from "react";
import { useStateStore } from "../../utils/StoreProvider.js";
import { TeacherCreator } from "../../components/Teacher/TeacherCreator/TeacherCreator";
import { TeacherDashboard } from "../../components/Teacher/TeacherDashboard/TeacherDashboard";
import { fetchAllTeacherMeetings } from "../../utils/teacher-fetches/meeting-fetches.js";
import { createTeacher } from "../../utils/teacher-fetches/auth-fetches";
import { TeacherAppBar } from "../../components/Teacher/TeacherAppBar/TeacherAppBar";
import { useStyles } from "./TeacherStyles";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { fetchAllTeacherSubscriptions } from "../../utils/teacher-fetches/subscription-fetches.js";
import { TeacherSubscriptions } from "../../components/Teacher/TeacherSubscriptions/TeacherSubscriptions.jsx";
import { fetchColorPalette } from "../../utils/teacher-fetches/auth-fetches";
import snackBar from "../../hooks/snackBar/snackBar";
import TeacherColorDialog from "../../components/Teacher/TeacherColorDialog/TeacherColorDialog";
import Footer from "../../components/Shared/Footer/Footer";


export const Teacher = () => {
    const { openSnackbar, SnackbarComponent } = snackBar();
    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    const [hexPalette, setHexPalette] = useState([]);
    const [creatorOpen, setCreatorOpen] = useState(false);
    const [colorDialog, setColorDialog] = useState(false);
    let [open, setOpen] = useState(true);
    const store = useStateStore();

    useEffect(() => {
        console.log("useEffect");
        if (store.teacherInfo.newUser) {
            setCreatorOpen(true);
        } else {
            handleLectureDashboard();
        }
    }, []);

    const handleCreateTeacher = async (selectedColor) => {
        setOpen(true);
        const returnedTeacherInfo = await createTeacher({ ...store.teacherInfo, color: selectedColor });
        store.changeTeacherInfo(returnedTeacherInfo);
        handleLectureDashboard();
        setOpen(false);
        setCreatorOpen(false);
    };

    const handleSubscriptionDashboard = async () => {
        setOpen(true);
        const returnedSubscriptionArray = await fetchAllTeacherSubscriptions(store.teacherInfo.id);
        setDisplayModule(<TeacherSubscriptions
            setOpen={setOpen}
            returnedSubscriptionArray={returnedSubscriptionArray}
            openSnackbar={openSnackbar}
        />);
        setOpen(false);
    };

    const handleLectureDashboard = async () => {
        console.log("handleLectureDashboard");
        setOpen(true);
        const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
        store.changeMeetingsObj(returnedMeetingArray);
        setDisplayModule(<TeacherDashboard
            setOpen={setOpen} />);
        setOpen(false);
    };

    const handleAvatarClick = async () => {
        setOpen(true);
        const returnedHexPalette = await fetchColorPalette(store.teacherInfo.picUrl);
        setHexPalette(returnedHexPalette.hexPalette);
        setColorDialog(true);
        setOpen(false);
    };

    const closeColorDialog = () => {
        setOpen(false);
        setColorDialog(false);
    };

    return (
        <div>
            <Grid>
                <TeacherAppBar
                    handleSubscriptionDashboard={handleSubscriptionDashboard}
                    handleLectureDashboard={handleLectureDashboard}
                    handleAvatarClick={handleAvatarClick}
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
            <TeacherColorDialog
                hexPalette={hexPalette}
                closeColorDialog={closeColorDialog}
                colorDialog={colorDialog}
            />
            <TeacherCreator
                handleCreateTeacher={handleCreateTeacher}
                creatorOpen={creatorOpen}
            />
        </div>

    );
};


export default Teacher;
