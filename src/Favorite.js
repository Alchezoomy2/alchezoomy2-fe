import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "./StoreProvider.js";
import { Divider, Paper, List, Typography, Avatar, TextField, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from "@material-ui/core";
import Fuse from "fuse.js";
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from "react-router-dom";
import favoriteListItem from "./favoriteListItem.js";
import Transition from "./DialogTransition.js";


import CommentIcon from "@material-ui/icons/Comment";
import { deleteFavorite } from "./utils/student-fetches/favorite-fetches.js";

export const Favorite = ({ handleMeetingDetailClick }) => {
    const [searchField, setSearchField] = useState("");
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();

    let fuseFavoriteList = new Fuse(store.favoriteArray, {
        keys: ["topic", "comment", "user_name"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    };

    const handleDeleteFavorite = async (favoriteId) => {
        const newFavoriteArray = await deleteFavorite(favoriteId);

        await store.changeFavoriteArray(newFavoriteArray);
        setOpen(false);
    };

    const handleDeleteClick = async (favorite) => {
        setDialogCard(favorite);
        setOpen(true);
    };

    const handleOpenMeeting = async (favorite) => {
        handleMeetingDetailClick(favorite.meetingId, favorite.parsed_timestamp);
    };


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
                    {searchField === "" ?
                        store.favoriteArray.map(favorite => favoriteListItem(
                            favorite,
                            handleDeleteClick,
                            handleOpenMeeting))
                        :
                        fuseFavoriteList.search(searchField).map(({ item }) => favoriteListItem(
                            item,
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
                                onClick={() => { handleDeleteFavorite(dialogCard.id); }}
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

export default Favorite;