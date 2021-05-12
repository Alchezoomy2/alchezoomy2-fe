import React from "react";

import { ListItemText, ListItem, Tooltip } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import useStyles from "./ChatListItemStyles";

export default function ChatListItem(chat, handleBookmark, handleUnbookmark, bookmarkArray, handleChatSeek) {
    const classes = useStyles();

    return (
        <div>
            <ListItem
                className={classes.listItem}
                divider={true}
            >
                <Tooltip title="Bookmark">
                    {(bookmarkArray &&
                        bookmarkArray.some(bookmark => bookmark.chat_id === chat.id)) ?
                        <BookmarkIcon
                            clickable
                            onClick={() => handleUnbookmark(bookmarkArray.find(bookmark => bookmark.chat_id === chat.id), chat)}
                        />
                        :
                        <BookmarkBorderIcon
                            clickable
                            onClick={() => handleBookmark(chat)}
                        />
                    }
                </Tooltip>
                <ListItemText
                    primary={`${chat.speaker} ${chat.text}`}
                    secondary={chat.timestamp} />
                <Tooltip title="Jump to">
                    <PlayArrowIcon
                        clickable
                        onClick={() => handleChatSeek(chat.parsed_timestamp)}
                    />
                </Tooltip>
            </ListItem>
        </div>

    );



}