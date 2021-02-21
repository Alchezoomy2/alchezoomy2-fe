import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";



export const FavoriteListItem = (favorite, handleDeleteClick, handleOpenMeeting) => {

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
                    <DeleteIcon
                        clickable
                        onClick={() => handleDeleteClick(favorite)}
                    />
                    <PlayArrowIcon
                        onClick={() => handleOpenMeeting(favorite)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    );
};

export default FavoriteListItem;
