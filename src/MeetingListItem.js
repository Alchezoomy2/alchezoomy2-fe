import React from "react";
import { Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from "@material-ui/core";

import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ReplyIcon from "@material-ui/icons/Reply";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PropTypes from "prop-types";


export const MeetingListItem = (meeting, favoriteArray, handleUnfavorite, handleFavorite, handleMeetingClick) => {
    return (
        <div>
            <div>
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <Avatar alt={meeting.user_name} src={meeting.pic_url} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={meeting.topic}
                        secondary={meeting.display_time}
                    />
                    <div>
                        <div>
                            <Chip
                                size="small"
                                color={meeting.video_url ? "primary" : ""}
                                icon={<VideoLabelIcon />}
                                label="video" />
                            <Chip
                                size="small"
                                color={meeting.audio_url ? "primary" : ""}
                                icon={<VolumeUpIcon />}
                                label="audio" />
                            <Chip
                                size="small"
                                color={meeting.chat_url ? "primary" : ""}
                                icon={<ChatIcon />}
                                label="chat" />
                            <Chip
                                size="small"
                                color={meeting.transcript_url ? "primary" : ""}
                                icon={<RecordVoiceOverIcon />} label="transcript" />

                            <Chip
                                size="small"
                                color="secondary"
                                label={"views: " + meeting.meeting_views} />
                            <Chip
                                size="small"
                                color="secondary"
                                label={"favorites " + meeting.meeting_favs} />
                        </div>
                        <div>
                            {
                                favoriteArray &&
                                    favoriteArray.some(favorite => favorite.meeting_id === meeting.id) ?
                                    <StarIcon
                                        clickable
                                        onClick={() => handleUnfavorite(favoriteArray.find(favorite => favorite.meeting_id === meeting.id), meeting)}
                                    />
                                    :
                                    <StarBorderIcon
                                        clickable
                                        onClick={() => handleFavorite(meeting)}
                                    />
                            }
                            <ReplyIcon
                                style={{ transform: "scaleX(-1)" }}
                                onClick={handleMeetingClick}
                            />
                        </div>
                    </div>
                </ListItem>
            </div>
            <Divider variant="middle" component="li" />
        </div>
    );
};

MeetingListItem.propTypes = {
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
    favoriteArray: PropTypes.array,
    handleUnfavorite: PropTypes.func,
    handleFavorite: PropTypes.func,
    handleMeetingClick: PropTypes.func

};

export default MeetingListItem;