import { useObserver } from "mobx-react";
import React, { useState, useEffect, useRef } from "react";
import fetch from 'superagent';

import { Divider, Paper, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControlLabel, Switch } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CommentIcon from '@material-ui/icons/Comment';

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
        fontWeight: 'bold',
        color: "black"
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

export const ChatBox = (props) => {
    const store = useStateStore();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();
    const [bookmarkArray, setBookmarkArray] = useState([]);
    const [commentField, setCommentField] = useState("");
    const [chatSync, setChatSync] = useState(true);
    const selectedChatId = useRef(0);


    const handleChatSync = () => {
        chatSync.current ? setChatSync(false) : setChatSync(true);
        console.log(chatSync.current)
    }

    const handleBookmark = async (chatItem) => {
        setCommentField("")
        setBookmarkCard({
            ...chatItem, title: "BOOKMARK", current: false
        });
        setOpen(true);
    }

    const handleUnbookmark = async (bookmarkItem, chatItem) => {
        setBookmarkCard({
            ...chatItem, comment: bookmarkItem.comment, title: "UNBOOKMARK", current: true
        });
        setOpen(true);
    }

    const handleBookmarkChange = async () => {
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
                    comment: commentField
                })
        }
        setBookmarkArray(newBookmarkArray.body);
        setOpen(false);
        setCommentField("")
    }

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    }

    useEffect(() => {
        async function retrieveBookmarks() {
            const bookmarkArray = await fetch
                .get(store.serverUrl + '/student/bookmark/' + store.studentInfo.id)

            await setBookmarkArray(bookmarkArray.body);
        }

        function selectedChat() {
            setInterval(() => {
                // store.changeVideoTimestamp(store.chatArray.find(chat => chat.timestamp < store.videoTimestamp))
                console.log(props.returnVideoTimestamp())
                console.log(store.chatArray.find(chat => chat.timestamp < props.returnVideoTimestamp()));
            }, 500
            )
        }

        retrieveBookmarks();
        selectedChat();
    }, [store, props])


    return useObserver(() =>
        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h5'>
                    CHAT
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={chatSync.current}
                            onChange={handleChatSync}
                            name="chatTrack"
                            color="primary"
                        />
                    }
                    label="sync chat"
                />
                <List className={classes.list}>
                    {store.chatArray.map(chat =>
                        <div>
                            <Divider />
                            <ListItem
                                className={classes.list_item}
                                selected={chat.id === selectedChatId}
                            >
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
                        <Divider />
                        {!bookmarkCard.current ?
                            <TextField
                                id="comment"
                                label="comment"
                                multiline
                                fullWidth
                                rows={4}
                                variant="outlined"
                                onChange={handleCommentChange}
                                value={commentField}
                            />
                            :
                            <Typography>
                                <CommentIcon fontSize="small" />
                                {`  ${bookmarkCard.comment}`}
                            </Typography>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBookmarkChange}
                            color="primary">
                            {bookmarkCard.title}
                        </Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }
        </div>
    )
}

export default ChatBox;