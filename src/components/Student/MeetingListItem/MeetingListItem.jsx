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


export const MeetingListItem = (meeting, favoriteArray, handleUnfavorite, handleFavorite, handleMeetingClick, meetingListItemClasses) => {
    return (
        <div
            style={{
                borderLeft: `15px solid ${meeting.color}`,
                margin: "3px"
            }}
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
                <div
                    className={meetingListItemClasses.chips}
                >
                    <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color={meeting.videoUrl ? "primary" : ""}
                        icon={<VideoLabelIcon />}
                        label="video" />
                    {/* <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color={meeting.audioUrl ? "primary" : ""}
                        icon={<VolumeUpIcon />}
                        label="audio" /> */}
                    <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color={meeting.chatUrl ? "primary" : ""}
                        icon={<ChatIcon />}
                        label="chat" />
                    <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color={meeting.transcriptUrl ? "primary" : ""}
                        icon={<RecordVoiceOverIcon />} label="transcript" />

                    <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color="primary"
                        label={"views: " + meeting.meetingViews} />
                    <Chip
                        size="small"
                        className={meetingListItemClasses.chip}
                        color="primary"
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
                            variant="contained" color="primary"
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
    handleMeetingClick: PropTypes.func

};

export default MeetingListItem;