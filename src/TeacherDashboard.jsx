import React, { useState } from "react";
import { useStateStore } from "./StoreProvider";
import { Container, List, Divider, Snackbar } from "@material-ui/core";
import { TeacherMeetingItem } from "./TeacherMeetingItem";
import PropTypes from "prop-types";
import { publishMeeting, unpublishMeeting } from "./utils/teacher-fetches/meeting-fetches.js";
import { useObserver } from "mobx-react";


export const TeacherDashboard = ({ setOpen, snackbarOpen, handleSnackbarClose }) => {
    const store = useStateStore();
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
        <Container maxWidth="xl" style={{ display: "flex", justifyItems: "center" }}>
            <List style={{ width: "90%" }}>
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
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={"Email invite sent"}
                key={"top_center_snackbar"}
            />
        </Container >
    );
};

TeacherDashboard.propTypes = {
    setOpen: PropTypes.func,
    handleSnackbarClose: PropTypes.func,
    snackbarOpen: PropTypes.bool
};
