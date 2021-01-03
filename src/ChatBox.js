import { useObserver } from "mobx-react";
import React, { useState, useEffect } from "react";
import fetch from 'superagent';

import { Divider, Paper, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    dialog_title: {
        backgroundColor: theme.color,
        color: '#fff'
    },
    dialog_speaker: {
        fontWeight: 'bold',
        fontSize: '1.1em',
        margin: '3px'
    },
    dialog_timestamp: {
        fontSize: '.9em',
        margin: '3px',
        color: "secondary"
    },
    dialog_text: {
        margin: '3px'
    }



}));

export const ChatBox = () => {
    const store = useStateStore();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();
    const [bookmarkArray, setBookmarkArray] = useState([]);

    const handleBookmark = (chatItem) => {
        setBookmarkCard({
            ...chatItem, title: "UNBOOKMARK?", function: deleteBookmark
        });
        setOpen(true);
    }

    const handleUnbookmark = (chatItem) => {
        setBookmarkCard({
            ...chatItem, title: "UNBOOKMARK?", function: saveBookmark
        });
        setOpen(true);
    }

    const saveBookmark = async () => {
        const bookmarkArray = await fetch
            .post(store.serverUrl + '/student/bookmark')
            .send({
                chatId: bookmarkCard.id,
                studentId: store.studentInfo.id,
            })
        setBookmarkArray(bookmarkArray.body)
        setOpen(false);
    }

    const deleteBookmark = async () => {
        const bookmarkArray = await fetch
            .delete(store.serverUrl + '/student/bookmark/' + bookmarkCard.id)

        setBookmarkArray(bookmarkArray.body);
        setOpen(false);
    }

    useEffect(() => {

        async function retrieveBookmarks() {
            const bookmarkArray = await fetch
                .get(store.serverUrl + '/student/bookmark/' + store.studentInfo.id)

            setBookmarkArray(bookmarkArray.body);
        }

        retrieveBookmarks();

    }, [store])


    return useObserver(() =>
        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h2'>
                    CHAT
            </Typography>
                <List className={classes.list}>
                    {store.chatArray.map(chat =>
                        <div>
                            <Divider />

                            <ListItem className={classes.list_item}>
                                {(bookmarkArray &&
                                    bookmarkArray.some(bookmark => bookmark.chat_id === chat.id)) ?
                                    <BookmarkIcon
                                        clickable
                                        onClick={() => handleUnbookmark(chat)}
                                    />
                                    :
                                    <BookmarkBorderIcon
                                        clickable
                                        onClick={() => handleBookmark(chat)}
                                    />
                                }
                                <ListItemText
                                    primary={`${chat.speaker} ${chat.text}`}
                                    secondary={chat.timestamp} />
                            </ListItem>
                        </div>
                    )}
                </List>
            </Paper>
            {bookmarkCard ?

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogTitle className={classes.dialog_title}>
                            {bookmarkCard.title}
                        </DialogTitle>
                        <DialogContentText id="speaker" className={classes.dialog_speaker}>
                            {bookmarkCard.speaker}
                        </DialogContentText>
                        {/* <DialogContentText id="speaker">
                            {bookmarkCard.speaker}
                        </DialogContentText> */}
                        <DialogContentText id="timestamp" className={classes.dialog_timestamp}>
                            {bookmarkCard.timestamp}
                        </DialogContentText>
                        <DialogContentText id="text" className={classes.dialog_text}>
                            {bookmarkCard.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            color="primary">
                            Disagree
                    </Button>
                        <Button
                            onClick={bookmarkCard.function}
                            color="primary">
                            Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                :
                "LOADING!"
            }
        </div>
    )
}

export default ChatBox;