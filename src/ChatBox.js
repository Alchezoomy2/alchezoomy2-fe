import { useObserver } from "mobx-react";
import React, { useState, useEffect } from "react";
import fetch from 'superagent';

import { Divider, Paper, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
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
        backgroundColor: "blue",
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

    const handleBookmark = async (chatItem) => {
        setBookmarkCard({
            ...chatItem, title: "BOOKMARK?", current: false
        });
        setOpen(true);
    }

    const handleUnbookmark = async (chatItem) => {
        setBookmarkCard({
            ...chatItem, title: "UNBOOKMARK?", current: true
        });
        setOpen(true);
    }

    const handleBookmarkChange = async (e) => {
        console.log(e.target.value)
        let newBookmarkArray = [];
        if (bookmarkCard.current) {

            const bookmarkId = bookmarkArray.find(bookmark => bookmark['chat_id'] === bookmarkCard.id)
            newBookmarkArray = await fetch
                .delete(store.serverUrl + '/student/bookmark/' + bookmarkId.id)
        } else {
            newBookmarkArray = await fetch
                .post(store.serverUrl + '/student/bookmark')
                .send({
                    chatId: bookmarkCard.id,
                    studentId: store.studentInfo.id,
                    comment: e.target.value
                })
        }
        setBookmarkArray(newBookmarkArray.body);
        setOpen(false);
    }

    useEffect(() => {
        async function retrieveBookmarks() {
            const bookmarkArray = await fetch
                .get(store.serverUrl + '/student/bookmark/' + store.studentInfo.id)

            await setBookmarkArray(bookmarkArray.body);
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
                    maxWidth="xl"
                >
                    <form onSubmit={(e) => { handleBookmarkChange(e) }}>
                        <DialogContent>
                            <DialogTitle className={classes.dialog_title}>
                                {bookmarkCard.title}
                            </DialogTitle>
                            <DialogContentText id="speaker" className={classes.dialog_speaker}>
                                {bookmarkCard.speaker}
                            </DialogContentText>
                            <DialogContentText id="timestamp" className={classes.dialog_timestamp}>
                                {bookmarkCard.timestamp}
                            </DialogContentText>
                            <DialogContentText id="text" className={classes.dialog_text}>
                                {bookmarkCard.text}
                            </DialogContentText>
                            <TextField
                                id="comment"
                                label="comment"
                                multiline
                                rows={4}
                                variant="outlined"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setOpen(false)}
                                color="primary">
                                Cancel
                        </Button>
                            <Button
                                // onClick={handleBookmarkChange}
                                color="primary">
                                {bookmarkCard.title}
                            </Button>
                        </DialogActions>
                    </form>

                </Dialog>
                :
                <></>
            }
        </div>
    )
}

export default ChatBox;