import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import DeleteIcon from "@material-ui/icons/Delete";



export const favoriteListItem = (favorite, handleDeleteClick, handleOpenMeeting) => {

    return (
        <div>
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
                    <ReplyIcon
                        style={{ transform: "scaleX(-1)" }}
                        onClick={() => handleOpenMeeting(favorite)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    );
};

export default favoriteListItem;
