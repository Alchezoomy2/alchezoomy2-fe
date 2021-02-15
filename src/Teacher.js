import React, { useState, useEffect } from "react";
import { useStateStore } from "./StoreProvider.js";
import { useObserver } from "mobx-react";
import { TeacherCreator } from "./TeacherCreator";
import { TeacherDashboard } from "./TeacherDashboard";
import { fetchAllTeacherMeetings } from "./utils/teacher-fetches/meeting-fetches.js";
import { createTeacher } from "./utils/teacher-fetches/auth-fetches";


import { AppBar, Typography, Grid, Backdrop, CircularProgress } from "@material-ui/core";


export const Teacher = () => {
    const [displayModule, setDisplayModule] = useState(null);
    let [open, setOpen] = useState(true);
    const store = useStateStore();


    const handleCreateTeacher = async (selectedColor) => {
        console.log("handleClick");
        setOpen(true);
        createTeacher({ ...store.teacherInfo, color: selectedColor })
            .then(res => store.changeTeacherInfo(res))
            .then(setOpen(false));
        console.log("WAIT!!!!");
        // setOpen(false);
    };


    useEffect(async () => {
        console.log("useEffect");
        console.log(store.teacherInfo.newUser);
        if (store.teacherInfo.newUser) {
            setDisplayModule(<TeacherCreator
                handleCreateTeacher={handleCreateTeacher}
            />);
        } else {
            const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
            store.changeMeetingsObj(returnedMeetingArray);
            setDisplayModule(<TeacherDashboard
            />);
        }

        setOpen(false);
        console.log("FALSE");
    }, [open]);



    return useObserver(() =>
        <div>
            <Grid>
                <AppBar position="static" style={{ width: "100%" }}>
                    <Typography
                        variant="h6" >
                        Alchezoomy
                </Typography>
                </AppBar>
                {displayModule}
                <Backdrop open={open}>
                    <CircularProgress />
                </Backdrop>
            </Grid>
        </div>

    );
};

export default Teacher;