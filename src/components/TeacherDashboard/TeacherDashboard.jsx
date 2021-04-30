import React, { useState } from "react";
import { useStateStore } from "../../utils/StoreProvider";
import { Paper, List, Divider } from "@material-ui/core";
import { TeacherMeetingItem } from "../TeacherMeetingItem/TeacherMeetingItem";
import PropTypes from "prop-types";
import { publishMeeting, unpublishMeeting, updateMeeting } from "../../utils/teacher-fetches/meeting-fetches.js";
import useStyles from "./teacherDashboardStyles";


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore();
    const classes = useStyles();
    const [meetingsToDisplay, setMeetingsToDisplay] = useState(store.meetingsObj);

    const handlePublish = async meeting => {
        let newMeetingObj;
        await setOpen(true);

        if (meeting.published) {
            newMeetingObj = await unpublishMeeting(meeting.id);

        } else {
            newMeetingObj = await publishMeeting(meeting.id);
        }

        setMeetingsToDisplay(newMeetingObj);
        setOpen(false);
    };

    const handleUpdate = async meeting => {
        await setOpen(true);

        const newMeetingArray = await updateMeeting(meeting.id, meeting);
        setMeetingsToDisplay(newMeetingArray);
        setOpen(false);
    };



    // useEffect(() => {
    //     store.changeMeetingsObj(setMeetingsToDisplay);
    //     setOpen(false);
    //     console.log("TeacherDashboard");
    // }, [meetingsToDisplay]);

    return (
        <div className={classes.frame}>
            <Paper
                maxWidth="xl"
                className={classes.root}>
                <List className={classes.list}>
                    {meetingsToDisplay !== null ?
                        meetingsToDisplay.map((meeting, index) => (
                            <div key={index}>
                                <TeacherMeetingItem
                                    meeting={meeting}
                                    handlePublish={handlePublish}
                                    handleUpdate={handleUpdate}
                                />
                                <Divider variant="middle" component="li" />
                            </div>

                        ))
                        : null
                    }
                </List>
            </Paper >
        </div >
    );
};

TeacherDashboard.propTypes = {
    setOpen: PropTypes.func,
    handleSnackbarClose: PropTypes.func,
    snackbarOpen: PropTypes.bool
};
