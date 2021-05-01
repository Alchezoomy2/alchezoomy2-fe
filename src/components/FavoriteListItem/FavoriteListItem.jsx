import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar, Button, Tooltip } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./FavoriteListItemStyles";


export const FavoriteListItem = (favorite, handleDeleteClick, handleOpenMeeting) => {
    const classes = useStyles();
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
                />
                <div>
                    <Tooltip title="Delete">
                        <DeleteIcon
                            clickable
                            onClick={() => handleDeleteClick(favorite)}
                        />
                    </Tooltip>
                    <Tooltip title="Play">
                        <Button
                            variant="contained" color="primary"
                            className={classes.playButton}
                            endIcon={<PlayArrowIcon />}
                            onClick={() => handleOpenMeeting(favorite)}                        >
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
