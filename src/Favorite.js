import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import { useStateStore } from './StoreProvider.js'
import { Divider, Paper, List, Typography, Avatar, TextField, Slide, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import fuse from 'fuse.js';
import fetch from 'superagent';
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from "react-router-dom";
import FavoriteListItem from './FavoriteListItem.js'

import CommentIcon from '@material-ui/icons/Comment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export const Favorite = (props) => {
    const [searchField, setSearchField] = useState('');
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();
    // const classes = useStyles();
    // const history = useHistory();
    let fuseFavoriteList = new fuse(store.favoriteArray, {
        keys: ['topic', 'comment', 'user_name'],
        threshold: 0.4,
        ignoreLocation: true
    })


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    }

    const handleDeleteFavorite = async (favoriteId) => {
        console.log('before fetch')
        const newFavoriteArray = await fetch
            .delete(store.serverUrl + '/student/favorite/' + favoriteId)
        console.log('afterfetch')
        store.changeFavoriteArray(newFavoriteArray.body);
        console.log('before setOpen')
        setOpen(false);
        console.log('after setOpen')

    }

    const handleDeleteClick = async (favorite) => {
        setDialogCard(favorite)
        setOpen(true);
    }

    const handleOpenMeeting = async (favorite) => {
        // const returnedObject = await fetch
        //     .get(store.serverUrl + `/student/meetings/${favorite.meeting_id}`)

        // await fetch.get(store.serverUrl + `/student/view/${favorite.meeting_id}`)
        // store.changeMeetingDetails(returnedObject.body.meeting);
        // store.changeTranscriptArray(returnedObject.body.transcript);
        // store.changeChatArray(returnedObject.body.chat);

        // history.push(`/meeting/${favorite.parsed_timestamp}`)
        props.handleMeetingDetailClick(favorite.meeting_id, favorite.parsed_timestamp)
    }



    return useObserver(() =>

        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h5'>
                    Favorites
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
                        store.favoriteArray.map(favorite => FavoriteListItem(favorite,
                            handleDeleteClick,
                            handleOpenMeeting))
                        :
                        fuseFavoriteList.search(searchField).map(({ item }) => FavoriteListItem(item,
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
                            <DialogContentText id="speaker">
                                {dialogCard.user_name}
                            </DialogContentText>
                            <DialogContentText id="timestamp">
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
                                onClick={() => { handleDeleteFavorite(dialogCard.id) }}
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

export default Favorite;