import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar, Button, Tooltip } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";


export const FavoriteListItem = (favorite, handleDeleteClick, handleOpenMeeting, listItemClasses) => {

    return (
        <div
            style={{ borderLeft: `15px solid ${favorite.color}`, margin: "3px" }}
        >
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={favorite.userName} src={favorite.picUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={favorite.topic}
                    secondary={favorite.displayTime}
                />
                <ListItemText
                    primary={favorite.comment}
                    className={listItemClasses.text}
                />
                <div
                    className={listItemClasses.buttons}>
                    <Tooltip title="Delete">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            endIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(favorite)}>
                            Delete
                        </Button>
                    </Tooltip>
                    <Tooltip title="Play">
                        <Button
                            variant="contained" color="primary"
                            className={listItemClasses.playButton}
                            size="small"
                            endIcon={<PlayArrowIcon />}
                            onClick={() => handleOpenMeeting(favorite)}>
                            Play
                    </Button>
                    </Tooltip>
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    );
};

export default FavoriteListItem;
