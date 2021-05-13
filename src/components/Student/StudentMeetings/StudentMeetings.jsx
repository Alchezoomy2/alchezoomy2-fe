import { Paper, List, TextField, Typography } from "@material-ui/core";
import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStateStore } from "../../../utils/StoreProvider.js";
import useStyles from "./studentMeetingsStyles";
import fuse from "fuse.js";
import MeetingListItem from "../MeetingListItem/MeetingListItem";
import meetingListItemStyles from "../MeetingListItem/meetingListItemStyles";
import BookmarkDialog from "../BookmarkDialog/BookmarkDialog";
import useBookmarkDialogStyles from "../BookmarkDialog/BookmarkDialogStyles";


import { createFavorite, deleteFavorite, fetchAllStudentFavorites } from "../../../utils/student-fetches/favorite-fetches";
import { fetchAllStudentMeetings } from "../../../utils/student-fetches/meeting-fetches";


export const Student = (props) => {
    const store = useStateStore();
    const classes = useStyles();
    const dialogClasses = useBookmarkDialogStyles();
    const [searchField, setSearchField] = useState("");
    const [commentField, setCommentField] = useState("");
    const [favoriteCard, setFavoriteCard] = useState("");
    const [favoriteArray, setFavoriteArray] = useState();
    const [open, setOpen] = useState(false);
    const meetingListItemClasses = meetingListItemStyles();

    let fuseMeetingList = new fuse(store.meetingsObj, {
        keys: ["topic"],
        threshold: 0.4,
        ignoreLocation: true
    });


    useEffect(() => {
        async function retrieveFavorites() {
            const newFavoritesArray = await fetchAllStudentFavorites();
            setFavoriteArray(newFavoritesArray);
        }
        retrieveFavorites();
    }, []);


    const handleFavorite = async (meetingObj) => {
        setCommentField("");
        setFavoriteCard({
            ...meetingObj,
            title: "FAVORITE",
            current: false
        });
        setOpen(true);
    };

    const handleUnfavorite = async (favoriteObj, meetingObj) => {
        setCommentField("");
        setFavoriteCard({
            ...meetingObj,
            comment: favoriteObj.comment,
            favoriteId: favoriteObj.id,
            title: "UNFAVORITE",
            current: true
        });
        setOpen(true);
    };

    const handleFavoriteChange = async () => {
        let newfavoriteArray = [];

        if (favoriteCard.current) {
            newfavoriteArray = await deleteFavorite(favoriteCard.id);
        } else {
            newfavoriteArray = await createFavorite({
                meetingId: favoriteCard.id,
                studentId: store.studentInfo.id,
                comment: commentField
            });
        }
        setFavoriteArray(newfavoriteArray);

        const newMeetingArray = await fetchAllStudentMeetings();

        store.changeMeetingsObj(newMeetingArray);

        setOpen(false);
        setCommentField("");
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    return useObserver(() =>
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
                    <Typography
                        variant="h5">
                        Lectures
                    </Typography>
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
                            store.meetingsObj.map(meeting => MeetingListItem(
                                meeting,
                                favoriteArray,
                                handleUnfavorite,
                                handleFavorite,
                                () => { props.handleMeetingDetailClick(meeting.id); },
                                meetingListItemClasses))
                            :
                            fuseMeetingList.search(searchField).map(({ item }) => {
                                return MeetingListItem(
                                    item,
                                    favoriteArray,
                                    handleUnfavorite,
                                    handleFavorite,
                                    () => { props.handleMeetingDetailClick(item.id); },
                                    meetingListItemClasses
                                );
                            })

                        }
                    </List>
                </div>
            </Paper >
            {
                favoriteCard ?
                    <BookmarkDialog
                        open={open}
                        dialogClasses={dialogClasses}
                        bookmarkCard={favoriteCard}
                        handleBookmarkChange={handleFavoriteChange}
                        handleDialogClose={handleDialogClose}
                        handleCommentChange={handleCommentChange}
                        commentField={commentField}
                    />
                    : null

            }
        </div >
    );
};

export default Student;
