import React, { useState } from "react";
import PropTypes from "prop-types";

import { ListItemText, TextField, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";


export default function TeacherMeetingTopic({ meeting, handleUpdate }) {
    const { topic, displayTime, duration, id } = meeting;
    const [editTopic, setEditTopic] = useState(false);
    const [topicContent, setTopicContent] = useState(topic);

    const submitChange = async (e) => {
        e.preventDefault();
        const updatedMeeting = meeting;
        updatedMeeting.topic = topicContent;
        await handleUpdate(meeting);
        setEditTopic(false);
    };

    const renderTopic = () => {
        if (editTopic) {
            return (
                <form
                    onSubmit={submitChange}>
                    <TextField
                        id={`${id}${topic}`}
                        defaultValue={topicContent}
                        onChange={(e) => setTopicContent(e.target.value)}
                        style={{
                            width: "100%"
                        }}
                    />
                </form>
            );
        } else {
            return (
                <div>
                    {topic}
                    <IconButton
                        aria-labl="edit-topic"
                        size="small"
                        onClick={() => setEditTopic(true)}
                    >
                        <EditIcon />
                    </IconButton>
                </div>
            );
        }
    };

    return (

        <ListItemText
            primary={renderTopic()}
            secondary={`${displayTime} - ${duration} min`}
        />
    );
}


TeacherMeetingTopic.propTypes = {
    meeting: PropTypes.object(PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired,
    })
    ),
    handleUpdate: PropTypes.func
};
