import React, { useState } from "react";
import { useStateStore } from "./StoreProvider";
import { Paper, List, Divider } from "@material-ui/core";
import { TeacherMeetingItem } from "./TeacherMeetingItem";
import PropTypes from "prop-types";
import { publishMeeting, unpublishMeeting } from "./utils/teacher-fetches/meeting-fetches.js";
import { useObserver } from "mobx-react";
import { makeStyles } from "@material-ui/styles";


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore();
    const classes = makeStyles();
    const [meetingsToDisplay, setMeetingsToDisplay] = useState(store.meetingsObj);


    const handlePublish = (async meeting => {
        let newMeetingObj;
        await setOpen(true);

        if (meeting.published) {
            newMeetingObj = await unpublishMeeting(meeting.id);

        } else {
            newMeetingObj = await publishMeeting(meeting.id);
        }

        setMeetingsToDisplay(newMeetingObj);
        setOpen(false);
    });



    // useEffect(() => {
    //     store.changeMeetingsObj(setMeetingsToDisplay);
    //     setOpen(false);
    //     console.log("TeacherDashboard");
    // }, [meetingsToDisplay]);

    return useObserver(() =>
        <div className={classes.frame}>
            <Paper
                maxWidth="xl"
                className={classes.root}>
                <List style={{ width: "90%" }
                } >
                    {
                        meetingsToDisplay.map((meeting, index) =>
                            <div key={index}>
                                <TeacherMeetingItem
                                    meeting={meeting}
                                    handlePublish={handlePublish}
                                    setMeetingsToDisplay={setMeetingsToDisplay} />
                                <Divider variant="middle" component="li" />
                            </div>

                        )
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
