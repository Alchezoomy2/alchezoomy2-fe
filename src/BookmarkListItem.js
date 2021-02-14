import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import DeleteIcon from "@material-ui/icons/Delete";





export const BookmarkListItem = (bookmark, handleDeleteClick, handleOpenMeeting) => {


    return (

        <div>

            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={bookmark.user_name} src={bookmark.pic_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={bookmark.topic}
                    secondary={bookmark.display_time}
                />
                <ListItemText
                    primary={`${bookmark.speaker}:  ${bookmark.text}`}
                    secondary={bookmark.comment}
                />
                <div>
                    <DeleteIcon
                        clickable
                        onClick={() => handleDeleteClick(bookmark)}
                    />
                    <ReplyIcon
                        style={{ transform: "scaleX(-1)" }}
                        onClick={() => handleOpenMeeting(bookmark)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    );
};

export default BookmarkListItem;
