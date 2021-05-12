import React, { useState, useEffect } from "react";
import fuse from "fuse.js";
import useStyles from "../ChatBox/ChatboxStyles";
import useBookmarkDialogStyles from "../BookmarkDialog/BookmarkDialogStyles";


import { Paper, List, ListItemText, ListItem, Typography, TextField, Tooltip } from "@material-ui/core";
import { useStateStore } from "../../../utils/StoreProvider";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { fetchAllStudentBookmarks, deleteBookmark, createBookmark } from "../../../utils/student-fetches/bookmark-fetches.js";
import BookmarkDialog from "../BookmarkDialog/BookmarkDialog";

export const TranscriptBox = ({ handleChatSeek }) => {
    const store = useStateStore();
    const classes = useStyles();
    const dialogClasses = useBookmarkDialogStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();
    const [bookmarkArray, setBookmarkArray] = useState([]);
    const [commentField, setCommentField] = useState("");
    const [searchField, setSearchField] = useState("");
    const FuseTranscriptList = new fuse(store.transcriptArray, {
        keys: ["text", "identifier"],
        threshold: 0.4,
        ignoreLocation: true
    });


    // const handleChatSync = async () => {
    //     await chatSync ? setChatSync(false) : setChatSync(true);
    // }

    const handleBookmark = async (transcriptItem) => {
        setCommentField("");
        setBookmarkCard({
            ...transcriptItem,
            title: "BOOKMARK",
            current: false
        });
        setOpen(true);
    };

    const handleUnbookmark = async (bookmarkItem, transcriptItem) => {
        setBookmarkCard({
            ...transcriptItem,
            comment: bookmarkItem.comment,
            title: "UNBOOKMARK",
            current: true
        });
        setOpen(true);
    };

    const handleBookmarkChange = async () => {
        let newBookmarkArray = [];
        if (bookmarkCard.current) {
            const bookmarkId = bookmarkArray.find(bookmark => bookmark["transcript_id"] === bookmarkCard.id);
            newBookmarkArray = await deleteBookmark(bookmarkId.id);
        } else {
            newBookmarkArray = await createBookmark({
                transcriptId: bookmarkCard.id,
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

    const handleDialogClose = () => {
        setOpen(false);
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

    const transcriptListItems = (transcript) => {

        return (
            <div>
                <ListItem
                    className={classes.listItem}
                    divider={true}
                >
                    <Tooltip title="Bookmark">
                        {(bookmarkArray &&
                            bookmarkArray.some(bookmark => bookmark.transcript_id === transcript.id)) ?
                            <BookmarkIcon
                                clickable
                                onClick={() => handleUnbookmark(bookmarkArray.find(bookmark => bookmark.transcript_id === transcript.id), transcript)}
                            />
                            :
                            <BookmarkBorderIcon
                                clickable
                                onClick={() => handleBookmark(transcript)}
                            />
                        }
                    </Tooltip>
                    <ListItemText
                        primary={`${transcript.speaker}: ${transcript.text}`}
                        secondary={transcript.timestamp} />
                    <Tooltip title="Jump to">
                        <PlayArrowIcon
                            clickable
                            onClick={() => handleChatSeek(transcript.time_start)}
                        />
                    </Tooltip>
                </ListItem>
            </div>

        );
    };



    return (
        <Paper
            elevation={3}
            className={classes.root}>
            <div className={classes.header}>
                <Typography
                    variant='h6'
                    className={classes.label}
                >
                    TRANSCRIPT
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
            />
            <List className={classes.list}>
                {searchField === "" ?
                    store.transcriptArray.map(chat => transcriptListItems(chat))
                    :
                    FuseTranscriptList.search(searchField).map(({ item }) => transcriptListItems(item))
                }
            </List>
            {bookmarkCard ?
                <BookmarkDialog
                    open={open}
                    dialogClasses={dialogClasses}
                    bookmarkCard={bookmarkCard}
                    handleBookmarkChange={handleBookmarkChange}
                    handleDialogClose={handleDialogClose}
                    handleCommentChange={handleCommentChange}
                    commentField={commentField}
                /> :
                null
            }
        </Paper>
    );
};


export default TranscriptBox;