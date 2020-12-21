import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List, ListItemText } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
// import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    list: {
        height: '200px',
        overflow: 'scroll',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export const ChatBox = () => {
    const store = useStateStore();
    const classes = useStyles();

    return useObserver(() =>
        <Paper elevation={3}>
            <List className={classes.list}>
                {store.chatArray.map(chat =>
                    <div>
                        <ListItemText
                            primary={`${chat.speaker}: ${chat.text}`}
                            secondary={chat.timestamp} />
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    )
}

export default ChatBox;