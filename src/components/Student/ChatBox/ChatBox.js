import React, { useState, useEffect } from "react";
import fuse from "fuse.js";
import useStyles from "./ChatboxStyles";

import { Paper, Divider, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from "@material-ui/core";
import { useStateStore } from "../../../utils/StoreProvider.js";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CommentIcon from "@material-ui/icons/Comment";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { fetchAllStudentBookmarks, deleteBookmark, createBookmark } from "../../../utils/student-fetches/bookmark-fetches.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ChatBox = ({ handleChatSeek }) => {
    const store = useStateStore();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();
    const [bookmarkArray, setBookmarkArray] = useState([]);
    const [commentField, setCommentField] = useState("");
    // const [chatSync, setChatSync] = useState(true);
    const [searchField, setSearchField] = useState("");
    // const selectedChatIndex = useRef(0)
    const FuseChatList = new fuse(store.chatArray, {
        keys: ["text", "speaker"],
        threshold: 0.4,
        ignoreLocation: true
    });


    // const handleChatSync = async () => {
    //     await chatSync ? setChatSync(false) : setChatSync(true);
    // }

    const handleBookmark = async (chatItem) => {
        setCommentField("");
        setBookmarkCard({
            ...chatItem,
            title: "BOOKMARK",
            current: false
        });
        setOpen(true);
    };

    const handleUnbookmark = async (bookmarkItem, chatItem) => {
        setBookmarkCard({
            ...chatItem,
            comment: bookmarkItem.comment,
            title: "UNBOOKMARK",
            current: true
        });
        setOpen(true);
    };

    const handleBookmarkChange = async () => {
        let newBookmarkArray = [];
        if (bookmarkCard.current) {
            const bookmarkId = bookmarkArray.find(bookmark => bookmark["chat_id"] === bookmarkCard.id);
            newBookmarkArray = await deleteBookmark(bookmarkId.id);
        } else {
            newBookmarkArray = await createBookmark({
                chatId: bookmarkCard.id,
                studentId: store.studentInfo.id,
                comment: commentField
            });
        }
        setBookmarkArray(newBookmarkArray);
        setOpen(false);
        setCommentField("");
    };

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    };

    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    };

    useEffect(() => {
        async function retrieveBookmarks() {
            const fetchedBookmarkArray = await fetchAllStudentBookmarks();
            setBookmarkArray(fetchedBookmarkArray);
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
    }, []);

    const chatListItems = (chat) => {

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
                    <PlayArrowIcon
                        clickable
                        onClick={() => handleChatSeek(chat.parsed_timestamp)}
                    />
                </ListItem>
            </div>

        );
    };



    return useObserver(() =>
        <Paper
            elevation={3}
            className={classes.root}>
            <div className={classes.header}>
                <Typography
                    variant='h6'
                    className={classes.label}
                >
                    CHAT
                </Typography>
            </div>
            {/* <FormControlLabel
                    control={
                        <Switch
                            checked={chatSync}
                            onChange={handleChatSync}
                            name="chatTrack"
                            color="primary"
                        />
                    }
                    label="sync chat"
                /> */}
            <TextField
                id="search"
                label="search"
                fullWidth
                variant="outlined"
                onChange={handleSearchChange}
                autocomplete="off"
            />
            <List className={classes.list}>
                {searchField === "" ?
                    store.chatArray.map(chat => chatListItems(chat))
                    :
                    FuseChatList.search(searchField).map(({ item }) => chatListItems(item))
                }
            </List>
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
                        <DialogTitle className={classes.dialogTitle}>
                            {bookmarkCard.title}
                        </DialogTitle>
                        <DialogContentText id="speaker" className={classes.dialogSpeaker}>
                            {bookmarkCard.speaker}
                        </DialogContentText>
                        <DialogContentText id="timestamp" className={classes.dialogTimestamp}>
                            {bookmarkCard.timestamp}
                        </DialogContentText>
                        <DialogContentText id="text" className={classes.dialogText}>
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
        </Paper>
    );
};


export default ChatBox;