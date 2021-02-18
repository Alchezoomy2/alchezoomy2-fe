import React from "react";
import { Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ReplyIcon from "@material-ui/icons/Reply";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    listItem: props => ({
        backgroundColor: props.backgroundColor
    })
});

export const MeetingListItem = (meeting, favoriteArray, handleUnfavorite, handleFavorite, handleMeetingClick) => {

    const classes = useStyles({ backgroundColor: meeting.color });
    return (
        <div>
            <div>
                <ListItem alignItems="flex-start" className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar alt={meeting.userName} src={meeting.picUrl} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={meeting.topic}
                        secondary={meeting.displayTime}
                    />
                    <div>
                        <div>
                            <Chip
                                size="small"
                                color={meeting.videoUrl ? "primary" : ""}
                                icon={<VideoLabelIcon />}
                                label="video" />
                            <Chip
                                size="small"
                                color={meeting.audioUrl ? "primary" : ""}
                                icon={<VolumeUpIcon />}
                                label="audio" />
                            <Chip
                                size="small"
                                color={meeting.chatUrl ? "primary" : ""}
                                icon={<ChatIcon />}
                                label="chat" />
                            <Chip
                                size="small"
                                color={meeting.transcriptUrl ? "primary" : ""}
                                icon={<RecordVoiceOverIcon />} label="transcript" />

                            <Chip
                                size="small"
                                color="secondary"
                                label={"views: " + meeting.meetingViews} />
                            <Chip
                                size="small"
                                color="secondary"
                                label={"favorites: " + meeting.meetingFavs} />
                        </div>
                        <div>
                            {
                                favoriteArray &&
                                    favoriteArray.some(favorite => favorite.meetingId === meeting.id) ?
                                    <StarIcon
                                        clickable
                                        onClick={() => handleUnfavorite(favoriteArray.find(favorite => favorite.meetingId === meeting.id), meeting)}
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
        displayTime: PropTypes.string.isRequired,
        videoUrl: PropTypes.string.isRequired,
        chatUrl: PropTypes.string.isRequired,
        transcriptUrl: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
        meetingViews: PropTypes.number.isRequired,
        meetingFavs: PropTypes.number.isRequired
    })
    ),
    favoriteArray: PropTypes.array,
    handleUnfavorite: PropTypes.func,
    handleFavorite: PropTypes.func,
    handleMeetingClick: PropTypes.func

};

export default MeetingListItem;