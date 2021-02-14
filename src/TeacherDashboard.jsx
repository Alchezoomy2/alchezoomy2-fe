import React, { useState, useEffect } from "react";
import { useStateStore } from "./StoreProvider";
import { Container, List, Divider } from "@material-ui/core";
import { TeacherMeetingItem } from "./TeacherMeetingItem";
import PropTypes from "prop-types";


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore();
    const [meetingsToDisplay, setMeetingsToDisplay] = useState(store.meetingsObj);

    useEffect(() => {
        store.changeMeetingsObj(setMeetingsToDisplay);
        setOpen(false);
        console.log("TeacherDashboard");
    }, [meetingsToDisplay]);

    return (
        <Container maxWidth="xl" style={{ display: "flex", justifyItems: "center" }}>
            <List style={{ width: "90%" }}>
                {
                    meetingsToDisplay.map((meeting, index) =>
                        <div key={index}>
                            <TeacherMeetingItem
                                meeting={meeting}
                                setOpen={setOpen}
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
