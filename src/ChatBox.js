import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List, ListItemText, ListItem, Typography } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    list: {
        height: '200px',
        overflow: 'scroll',
    },
    list_item: {
        width: '650px',
    },
}));

export const ChatBox = () => {
    const store = useStateStore();
    const classes = useStyles();

    return useObserver(() =>
        <Paper elevation={3}>
            <Typography
                variant='h2'>
                CHAT
            </Typography>
            <List className={classes.list}>
                {store.chatArray.map(chat =>
                    <div>
                        <ListItem className={classes.list_item}>
                            <BookmarkBorderIcon />
                            <ListItemText
                                primary={`${chat.speaker} ${chat.text}`}
                                secondary={chat.timestamp} />
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    )
}

export default ChatBox;