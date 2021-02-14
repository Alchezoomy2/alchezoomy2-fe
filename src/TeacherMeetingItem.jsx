import React from "react";
import { Chip, ListItem, ListItemText, FormControlLabel, Switch } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import { publishMeeting, unpublishMeeting } from "./utils/teacher-fetches/meeting-fetches.js";
import PropTypes from "prop-types";



export const TeacherMeetingItem = ({ meeting, setOpen, setMeetingsToDisplay }) => {

    const handlePublish = (async (meeting) => {
        let newMeetingObj;
        await setOpen(true);
        console.log("handlePublish");
        if (meeting.published) {
            newMeetingObj = await unpublishMeeting(meeting.id);

        } else {
            newMeetingObj = await publishMeeting(meeting.id);
        }

        setMeetingsToDisplay(newMeetingObj);
    });

    return (
        < ListItem alignItems="flex-start" >
            <ListItemText
                primary={meeting.topic}
                secondary={meeting.display_time}
            />
            <div>
                <Chip size="small" color={meeting.video_url ? "primary" : ""} icon={<VideoLabelIcon />} label="video" />
                <Chip size="small" color={meeting.audio_url ? "primary" : ""} icon={<VolumeUpIcon />} label="audio" />
                <Chip size="small" color={meeting.chat_url ? "primary" : ""} icon={<ChatIcon />} label="chat" />
                <Chip size="small" color={meeting.transcript_url ? "primary" : ""} icon={<RecordVoiceOverIcon />} label="transcript" />
            </div>
            <FormControlLabel
                control={<Switch checked={meeting.published}
                    onChange={() => handlePublish(meeting)}
                    name='publish'
                    color="primary"
                />}
                label="publish" />
            <div>
                <Chip size="small" color="secondary" label={"views: " + meeting.meeting_views} />
                <Chip size="small" color="secondary" label={"favorites " + meeting.meeting_favs} />
            </div>
        </ListItem >
    );
};

TeacherMeetingItem.propTypes = {
    meeting: PropTypes.object(PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired,
        display_time: PropTypes.string.isRequired,
        video_url: PropTypes.string.isRequired,
        chat_url: PropTypes.string.isRequired,
        transcript_url: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
        meeting_views: PropTypes.number.isRequired,
        meeting_favs: PropTypes.number.isRequired
    })
    ),
    setOpen: PropTypes.func,
    setMeetingsToDisplay: PropTypes.func
};
