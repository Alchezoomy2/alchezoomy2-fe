import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import { useStateStore } from './StoreProvider.js'
import { Divider, Paper, List, ListItemText, ListItem, Typography, ListItemAvatar, Avatar, TextField, Slide, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import fuse from 'fuse.js';
import fetch from 'superagent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


import CommentIcon from '@material-ui/icons/Comment';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    reply_icon: {
        transform: 'scaleX(-1)'
    }
}))


export const Bookmark = () => {
    const [searchField, setSearchField] = useState('');
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();
    let fuseBookmarkList = new fuse(store.bookmarkArray, {
        keys: ['text', 'speaker', 'comment'],
        threshold: 0.4,
        ignoreLocation: true
    })


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    }

    const handleDeleteBookmark = async (bookmarkId) => {

        const newBookmarkArray = await fetch
            .delete(store.serverUrl + '/student/bookmark/' + bookmarkId)
        store.changeBookmarkArray(newBookmarkArray.body);
    }

    const handleDeleteClick = async (bookmark) => {
        setDialogCard(bookmark)
        setOpen(true);
    }

    const handleOpenMeeting = async (bookmark) => {
        const returnedObject = await fetch
            .get(store.serverUrl + `/student/meetings/${bookmark.meeting_id}`)

        await fetch.get(store.serverUrl + `/student/view/${bookmark.meeting_id}`)
        store.changeMeetingDetails(returnedObject.body.meeting);
        store.changeTranscriptArray(returnedObject.body.transcript);
        store.changeChatArray(returnedObject.body.chat);

        history.push(`/meeting/${bookmark.parsed_timestamp}`)
    }

    const listItems = (bookmark) => {

        return <div>

            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={bookmark.user_name} src={bookmark.pic_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={bookmark.topic}
                    secondary={bookmark.display_time}
                />
                <ListItemText
                    primary={`${bookmark.speaker}:  ${bookmark.text}`}
                    secondary={bookmark.comment}
                />
                <div>
                    <DeleteIcon
                        clickable
                        onClick={() => handleDeleteClick(bookmark)}
                    />
                    <ReplyIcon
                        className={classes.reply_icon}
                        onClick={() => handleOpenMeeting(bookmark)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    }


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
                    {searchField === '' ?
                        store.bookmarkArray.map(bookmark => listItems(bookmark))
                        :
                        fuseBookmarkList.search(searchField).map(({ item }) => listItems(item))
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
                            <DialogTitle className={classes.dialog_title}>
                                {dialogCard.topic}
                            </DialogTitle>
                            <DialogContentText id="speaker" className={classes.dialog_speaker}>
                                {dialogCard.user_name}
                            </DialogContentText>
                            <DialogContentText id="timestamp" className={classes.dialog_timestamp}>
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
                                onClick={() => { handleDeleteBookmark(dialogCard.id) }}
                                color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog >
                    :
                    <></>
            }



        </div >

    )
}

export default Bookmark;