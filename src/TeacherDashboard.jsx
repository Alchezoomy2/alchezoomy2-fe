import React, { useState } from "react";
import { useStateStore } from "./StoreProvider";
import { Container, List, Divider } from "@material-ui/core";
import { TeacherMeetingItem } from "./TeacherMeetingItem";
import PropTypes from "prop-types";
import { publishMeeting, unpublishMeeting } from "./utils/teacher-fetches/meeting-fetches.js";


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore();
    const [meetingsToDisplay, setMeetingsToDisplay] = useState(store.meetingsObj);
    console.log(meetingsToDisplay[0]);


    const handlePublish = (async meeting => {
        console.log("hi!");

        let newMeetingObj;
        await setOpen(true);
        console.log("handlePublish");
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

    return (
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
        </Container >
    );
};

TeacherDashboard.propTypes = {
    setOpen: PropTypes.func
};
