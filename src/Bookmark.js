import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "./StoreProvider.js";
import { Divider, Paper, List, Typography, Avatar, TextField, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from "@material-ui/core";
import fuse from "fuse.js";
import { deleteBookmark } from "./utils/student-fetches/bookmark-fetches.js";
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from "react-router-dom";
import BookmarkListItem from "./BookmarkListItem.js";
import Transition from "./DialogTransition.js";

import CommentIcon from "@material-ui/icons/Comment";


// const useStyles = makeStyles((theme) => ({
//     reply_icon: {
//         transform: 'scaleX(-1)'
//     }
// }))


export const Bookmark = ({ handleMeetingDetailClick }) => {
    const [searchField, setSearchField] = useState("");
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();
    // const classes = useStyles();
    // const history = useHistory();
    let fuseBookmarkList = new fuse(store.bookmarkArray, {
        keys: ["text", "speaker", "comment", "topic"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
        console.log(fuseBookmarkList);
    };

    const handleDeleteBookmark = async (bookmarkId) => {
        const newBookmarkArray = await deleteBookmark(bookmarkId);

        store.changeBookmarkArray(newBookmarkArray);
        setOpen(false);
    };

    const handleDeleteClick = async (bookmark) => {
        setDialogCard(bookmark);
        setOpen(true);
    };

    const handleOpenMeeting = async (bookmark) => {

        handleMeetingDetailClick(bookmark.meeting_id, bookmark.parsed_timestamp);
    };


    return useObserver(() =>

        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h5'>
                    Bookmarks
                    </Typography>
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
                <List>
                    {searchField === "" ?
                        store.bookmarkArray.map(bookmark => BookmarkListItem(bookmark,
                            handleDeleteClick,
                            handleOpenMeeting))
                        :
                        fuseBookmarkList.search(searchField).map(({ item }) => BookmarkListItem(item,
                            handleDeleteClick,
                            handleOpenMeeting))
                    }
                </List>
            </Paper>
            {
                dialogCard ?
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
                            <Avatar alt={dialogCard.user_name} src={dialogCard.pic_url} />
                            <DialogTitle >
                                {dialogCard.topic}
                            </DialogTitle>
                            <DialogContentText id="speaker" >
                                {dialogCard.user_name}
                            </DialogContentText>
                            <DialogContentText id="timestamp" >
                                {dialogCard.display_time}
                            </DialogContentText>
                            <Divider />
                            <Typography>
                                <CommentIcon fontSize="small" />
                                {`  ${dialogCard.comment}`}
                            </Typography>

                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setOpen(false)}
                                color="primary">
                                Cancel
                                </Button>
                            <Button
                                onClick={() => { handleDeleteBookmark(dialogCard.id); }}
                                color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog >
                    :
                    <></>
            }



        </div >

    );
};

export default Bookmark;