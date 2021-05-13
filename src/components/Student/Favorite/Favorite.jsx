// import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "../../../utils/StoreProvider.js";
import { Paper, List, Typography, TextField, } from "@material-ui/core";
import fuse from "fuse.js";
import FavoriteListItem from "../FavoriteListItem/FavoriteListItem";
import useStyles from "./FavoriteStyle";
import FavoriteListItemStyles from "../FavoriteListItem/FavoriteListItemStyles";


import { deleteFavorite } from "../../../utils/student-fetches/favorite-fetches";
import DeleteDialog from "../DeleteDialog/DeleteDialog.jsx";
import deleteDialogStyles from "../DeleteDialog/DeleteDialogStyles";

export const Favorite = ({ handleMeetingDetailClick }) => {
    const classes = useStyles();
    const deleteDialogClasses = deleteDialogStyles();
    const listItemClasses = FavoriteListItemStyles();
    const [searchField, setSearchField] = useState("");
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();

    let fuseFavoriteList = new fuse(store.favoriteArray, {
        keys: ["topic", "comment", "userName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    };

    const handleDeleteFavorite = async (favoriteId) => {
        const newFavoriteArray = await deleteFavorite(favoriteId);
        store.changeFavoriteArray(newFavoriteArray);
        setOpen(false);
    };

    const handleDeleteClick = async (favorite) => {
        setDialogCard(favorite);
        setOpen(true);
    };

    const handleOpenMeeting = async (favorite) => {
        handleMeetingDetailClick(favorite.meetingId, favorite.parsed_timestamp);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };


    return (

        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
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
                        autocomplete="off"
                    />
                    <List>
                        {searchField === "" ?
                            store.favoriteArray.map(favorite => FavoriteListItem(
                                favorite,
                                handleDeleteClick,
                                handleOpenMeeting,
                                listItemClasses))
                            :
                            fuseFavoriteList.search(searchField).map(({ item }) => FavoriteListItem(
                                item,
                                handleDeleteClick,
                                handleOpenMeeting,
                                listItemClasses))
                        }
                    </List>
                </div>
            </Paper>
            {
                dialogCard ?
                    <DeleteDialog
                        open={open}
                        dialogCard={dialogCard}
                        handleCloseDialog={handleCloseDialog}
                        handleDeleteFavorite={handleDeleteFavorite}
                        deleteDialogClasses={deleteDialogClasses}
                    />
                    : null
            }
        </div >

    );
};

export default Favorite;