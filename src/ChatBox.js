import { useObserver } from "mobx-react";
import React, { useState, useEffect, useRef } from "react";
import fetch from 'superagent';
import fuse from 'fuse.js';

import { Divider, Paper, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControlLabel, Switch } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ReplyIcon from '@material-ui/icons/Reply';

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
        width: '90%'
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
    },
    reply_icon: {
        transform: 'scaleX(-1)'
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
    const [searchField, setSearchField] = useState('');
    const selectedChatIndex = useRef(0)
    const fuseChatList = new fuse(store.chatArray, {
        keys: ['text', 'speaker'],
        threshold: 0.4,
        ignoreLocation: true
    })


    const handleChatSync = async () => {
        await chatSync ? setChatSync(false) : setChatSync(true);
        console.log(chatSync)
    }

    const handleBookmark = async (chatItem) => {
        setCommentField("")
        setBookmarkCard({
            ...chatItem,
            title: "BOOKMARK",
            current: false
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

    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    }

    useEffect(() => {
        async function retrieveBookmarks() {
            const bookmarkArray = await fetch
                .get(store.serverUrl + '/student/bookmark/' + store.studentInfo.id)

            await setBookmarkArray(bookmarkArray.body);
        }

        // function selectedChat() {
        //     setInterval(() => {

        //         if (selectedChatIndex.current < store.chatArray.length && store.chatArray[selectedChatIndex.current + 1].parsed_timestamp < props.returnVideoTimestamp()) {
        //             selectedChatIndex.current = selectedChatIndex.current + 1;
        //         }
        //     }, 500
        //     )
        // }

        retrieveBookmarks();
        // selectedChat();
    }, [store, props])

    const chatListItems = (chat) => {

        return (
            <div>
                <Divider />
                <ListItem
                    className={classes.list_item}
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
                    <ReplyIcon
                        className={classes.reply_icon}
                        clickable
                        onClick={() => props.handleChatSeek(chat.parsed_timestamp)}
                    />
                </ListItem>
            </div>

        )
    }



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
                            checked={chatSync}
                            onChange={handleChatSync}
                            name="chatTrack"
                            color="primary"
                        />
                    }
                    label="sync chat"
                />
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
                <List className={classes.list}>
                    {searchField === '' ?
                        store.chatArray.map(chat => chatListItems(chat))
                        :
                        fuseChatList.search(searchField).map(({ item }) => chatListItems(item))
                    }
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