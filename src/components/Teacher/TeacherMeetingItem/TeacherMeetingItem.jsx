import React from "react";
import { Chip, ListItem, FormControlLabel, Switch, IconButton } from "@material-ui/core";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import RefreshIcon from "@material-ui/icons/Refresh";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PropTypes from "prop-types";
import useStyles from "./teacherMeetingItemsStyles";
import { useStateStore } from "../../../utils/StoreProvider";
import { refreshMeeting } from "../../../utils/teacher-fetches/meeting-fetches";

import TeacherMeetingTopic from "../TeacherMeetingTopic/TeacherMeetingTopic";

export const TeacherMeetingItem = ({ meeting, handlePublish, handleUpdate }) => {
    const props = { borderColor: meeting.color };
    const classes = useStyles(props);
    const store = useStateStore();

    const handleRefreshClick = async () => {
        const refreshedMeeting = await refreshMeeting(meeting.id, store.teacherInfo);

        const meetingIndex = store.meetingsObj.some(meeting, index => { if (meeting.id === refreshedMeeting.id) return index; });
        console.log("🚀 ~ file: TeacherMeetingItem.jsx ~ line 23 ~ handleRefreshClick ~ meetingIndex", meetingIndex);
        store.meetingsObj.splice(meetingIndex, 1, refreshedMeeting);
    };

    return (
        <div className={classes.frame}>
            <ListItem
                alignItems="flex-start"
                className={classes.listItem}>
                <IconButton
                    onClick={handleRefreshClick}
                    aria-label="refresh">
                    <RefreshIcon />
                </IconButton>
                <TeacherMeetingTopic
                    meeting={meeting}
                    handleUpdate={handleUpdate}
                />
                <div className={classes.widgets}>
                    <div className={classes.chips}>
                        <Chip
                            size="small"
                            className={classes.chip}
                            color={meeting.videoUrl ? "primary" : ""}
                            icon={<VideoLabelIcon />}
                            label="video" />

                        <Chip
                            size="small"
                            className={classes.chip}
                            color={meeting.chatUrl ? "primary" : ""}
                            icon={<ChatIcon />}
                            label="chat" />
                        <Chip
                            size="small"
                            className={classes.chip}
                            color={meeting.transcriptUrl ? "primary" : ""}
                            icon={<RecordVoiceOverIcon />}
                            label="transcript" />
                    </div>
                    <FormControlLabel
                        control={<Switch checked={meeting.published}
                            onChange={() => handlePublish(meeting)}
                            name='publish'
                            color="primary"
                        />}
                        label="publish" />
                    <div>
                        <Chip
                            size="small"
                            className={classes.chip}
                            color="primary"
                            label={"views: " + meeting.meetingViews} />
                        <Chip
                            size="small"
                            className={classes.chip}
                            color="primary"
                            label={"favorites " + meeting.meetingFavs} />
                    </div>
                </div>
            </ListItem >
        </div >
    );
};

TeacherMeetingItem.propTypes = {
    meeting: PropTypes.object(PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired,
        displayTime: PropTypes.string.isRequired,
        videoUrl: PropTypes.string.isRequired,
        chatUrl: PropTypes.string.isRequired,
        transcriptUrl: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
        meetingViews: PropTypes.number.isRequired,
        meetingFavs: PropTypes.number.isRequired
    })
    ),
    handlePublish: PropTypes.func,
    handleUpdate: PropTypes.func
};
