import { Container, List, Avatar, Divider, Button, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Typography, DialogActions } from "@material-ui/core";
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "./StoreProvider.js";
import useStyles from "./styles/studentMeetings";
import fuse from "fuse.js";
import MeetingListItem from "./MeetingListItem.js";
import Transition from "./DialogTransition.js";


import CommentIcon from "@material-ui/icons/Comment";
import { createFavorite, deleteFavorite } from "./utils/student-fetches/favorite-fetches.js";
import { fetchAllStudentMeetings } from "./utils/student-fetches/meeting-fetches.js";


export const Student = (props) => {
    const store = useStateStore();
    const [searchField, setSearchField] = useState("");
    const [commentField, setCommentField] = useState("");
    const [favoriteCard, setFavoriteCard] = useState("");
    const [favoriteArray, setFavoriteArray] = useState();
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    let fuseMeetingList = new fuse(store.meetingsObj, {
        keys: ["topic", "userName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    // useEffect(() => {
    //     async function retrieveFavorites() {
    //         const newFavoritesArray = await fetchAllStudentFavorites();
    //         await setFavoriteArray(newFavoritesArray);
    //     }
    //     retrieveFavorites();

    // }, [store]);


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

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
        console.log(fuseMeetingList);

    };

    return useObserver(() =>
        <div>
            <Container maxWidth="xl" className={classes.root}>
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
                <List className={classes.list}>

                    {searchField === "" ?
                        store.meetingsObj.map(meeting => MeetingListItem(
                            meeting,
                            favoriteArray,
                            handleUnfavorite,
                            handleFavorite,
                            () => { props.handleMeetingDetailClick(meeting.id); }))
                        :
                        fuseMeetingList.search(searchField).map(({ item }) => {
                            console.log({ ...item });
                            console.log(item.id);
                            return MeetingListItem(
                                item,
                                favoriteArray,
                                handleUnfavorite,
                                handleFavorite,
                                () => { props.handleMeetingDetailClick(item.id); }
                            );
                        })

                    }
                </List>

            </Container >
            {
                favoriteCard ?
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
                            <Avatar alt={favoriteCard.userName} src={favoriteCard.picUrl} />
                            <DialogTitle className={classes.dialogTitle}>
                                {favoriteCard.topic}
                            </DialogTitle>
                            <DialogContentText id="speaker" className={classes.dialogSpeaker}>
                                {favoriteCard.userName}
                            </DialogContentText>
                            <DialogContentText id="timestamp" className={classes.dialogTimestamp}>
                                {favoriteCard.displayTime}
                            </DialogContentText>
                            <Divider />
                            {!favoriteCard.current ?
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
                                    {`  ${favoriteCard.comment}`}
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
                                onClick={handleFavoriteChange}
                                color="primary">
                                {favoriteCard.title}
                            </Button>
                        </DialogActions>
                    </Dialog >
                    :
                    <></>
            }
        </div >
    );
};

export default Student;
