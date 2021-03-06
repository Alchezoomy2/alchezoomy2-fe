import React from "react";
import { useStateStore } from "../../../utils/StoreProvider";
import { Paper, List, Divider } from "@material-ui/core";
import { TeacherMeetingItem } from "../TeacherMeetingItem/TeacherMeetingItem";
import PropTypes from "prop-types";
import { publishMeeting, unpublishMeeting, updateMeeting } from "../../../utils/teacher-fetches/meeting-fetches.js";
import useStyles from "./teacherDashboardStyles";
import { useObserver } from "mobx-react";
import useSnackBar from "../../../hooks/snackBar/snackBar";


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore();
    const classes = useStyles();
    const { openSnackbar, SnackbarComponent } = useSnackBar();

    const handlePublish = async meeting => {
        let newMeetingObj;
        await setOpen(true);

        if (meeting.published) {
            newMeetingObj = await unpublishMeeting(meeting.id);

        } else {
            newMeetingObj = await publishMeeting(meeting.id);
        }
        store.changeMeetingsObj(newMeetingObj);

        setOpen(false);
    };

    const handleUpdate = async meeting => {
        await setOpen(true);

        await updateMeeting(meeting.id, meeting)
            .then(newMeetingArray =>
                store.changeMeetingsObj(newMeetingArray))
            .catch(({ message }) => openSnackbar("error", message));

        setOpen(false);
    };

    return useObserver(() => (
        <>
            <div className={classes.root}>
                <Paper
                    maxWidth="xl"
                    elevation={3}
                    className={classes.frame}>
                    <List className={classes.list}>
                        {store.meetingsObj !== null ?
                            store.meetingsObj.map((meeting, index) => (
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
            <SnackbarComponent />
        </>
    ));
};

TeacherDashboard.propTypes = {
    setOpen: PropTypes.func,
    colorDialog: PropTypes.bool
};
