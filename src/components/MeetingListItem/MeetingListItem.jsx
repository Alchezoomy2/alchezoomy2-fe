import React from "react";
import { Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Tooltip, Button } from "@material-ui/core";


import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PropTypes from "prop-types";
// import useStyles from "./meetingListItemStyles";


export const MeetingListItem = (meeting, favoriteArray, handleUnfavorite, handleFavorite, handleMeetingClick, itemClasses) => {
    // const props = { borderColor: meeting.color };
    // const classes = useStyles(props);
    return (
        <div
            style={{ borderLeft: "15px solid", margin: "3px" }}
        >
            <ListItem
                alignItems="flex-start"
                divider={true}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={meeting.userName}
                        src={meeting.picUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={meeting.topic}
                    secondary={`${meeting.displayTime} - ${meeting.duration} min`}
                />
                <div className={itemClasses.chips}>
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
                    <Tooltip title="Favorite">
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
                    </Tooltip>
                    <Tooltip title="Play">
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={itemClasses.playButton}
                            endIcon={<PlayArrowIcon />}
                            onClick={handleMeetingClick}
                        >
                            Play
                    </Button>
                    </Tooltip>
                </div>
            </ListItem>
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
    handleMeetingClick: PropTypes.func,
    itemClasses: PropTypes.object
};

export default MeetingListItem;