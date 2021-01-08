import { Container, List, Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Dialog, DialogContent, DialogTitle, Slide, DialogContentText, TextField, Typography, DialogActions } from '@material-ui/core';
import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { makeStyles } from '@material-ui/core/styles';
import fuse from 'fuse.js';
import MeetingListItem from './MeetingListItem.js';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ReplyIcon from '@material-ui/icons/Reply';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: '90vh',
        maxWidth: '80vw',
        overflow: 'scroll',
    },
    list: {
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

export const Student = (props) => {
    const store = useStateStore();
    const [searchField, setSearchField] = useState('');
    const [commentField, setCommentField] = useState('');
    const [favoriteCard, setFavoriteCard] = useState('');
    const [favoriteArray, setFavoriteArray] = useState();
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    let fuseMeetingList = new fuse(store.meetingsObj, {
        keys: ['topic', 'user_name', 'display_time'],
        threshold: 0.4,
        ignoreLocation: true
    })


    useEffect(() => {

        async function retrieveFavorites() {
            const newFavoritesArray = await fetch
                .get(store.serverUrl + '/student/favorite/' + store.studentInfo.id)

            await setFavoriteArray(newFavoritesArray.body);
        }
        retrieveFavorites();
    }, [store]);

    // useEffect(() => {

    //     async function retrieveStudentInfo() {
    //         let returnedStudentInfo = await fetch
    //             .post(store.serverUrl + '/student/oauth')
    //             .send({ code: store.code });

    //         if (returnedStudentInfo.body.new_user) {
    //             returnedStudentInfo = await fetch
    //                 .post(store.serverUrl + '/student/new')
    //                 .send({ student_info: returnedStudentInfo.body })
    //         }
    //         await store.changeStudentInfo(returnedStudentInfo.body);
    //     }

    //     async function retrieveMeetings() {
    //         const newMeetingObj = await fetch
    //             .post(store.serverUrl + '/student/meetings')
    //             .send({ student_info: store.studentInfo })

    //         store.changeMeetingsObj(newMeetingObj.body);
    //     }



    //     // return retrieveStudentInfo()
    //     //     .then(retrieveMeetings)
    //     //     .then(retrieveFavorites)
    // }, [store]);

    // const handleMeetingClick = async (meetingId) => {
    //     const returnedObject = await fetch
    //         .get(store.serverUrl + `/student/meetings/${meetingId}`)

    //     await fetch.get(store.serverUrl + `/student/view/${meetingId}`)
    //     store.changeMeetingDetails(returnedObject.body.meeting);
    //     store.changeTranscriptArray(returnedObject.body.transcript);
    //     store.changeChatArray(returnedObject.body.chat);

    //     history.push(`/meeting/0`)
    // }

    // const handleBookmarkClick = async () => {
    //     const returnedBookmarkArray = await fetch
    //         .get(store.serverUrl + `/student/bookmark/` + store.studentInfo.id);

    //     await store.changeBookmarkArray(returnedBookmarkArray.body)
    //     history.push(`/bookmark`)
    // }

    // const handleFavoriteClick = async () => {
    //     const returnedFavoriteArray = await fetch
    //         .get(store.serverUrl + `/student/favorite/` + store.studentInfo.id);

    //     await store.changeBookmarkArray(returnedFavoriteArray.body)

    //     history.push(`/bookmark`)
    // }


    const handleFavorite = async (meetingObj) => {
        setCommentField('');
        setFavoriteCard({
            ...meetingObj,
            title: "FAVORITE",
            current: false
        });
        setOpen(true);
    }

    const handleUnfavorite = async (favoriteObj, meetingObj) => {
        setCommentField('');
        setFavoriteCard({
            ...meetingObj,
            comment: favoriteObj.comment,
            favoriteId: favoriteObj.id,
            title: "UNFAVORITE",
            current: true
        });
        setOpen(true);
    }

    const handleFavoriteChange = async () => {
        let newfavoriteArray = [];

        console.log(favoriteCard)

        if (favoriteCard.current) {
            // const favoriteId = favoriteArray.find(favorite => favorite.meeting_id === favoriteCard.id)
            newfavoriteArray = await fetch
                .delete(store.serverUrl + '/student/favorite/' + favoriteCard.favoriteId)
        } else {
            newfavoriteArray = await fetch
                .post(store.serverUrl + '/student/favorite/')
                .send({
                    meetingId: favoriteCard.id,
                    studentId: store.studentInfo.id,
                    comment: commentField
                })
        }
        setFavoriteArray(newfavoriteArray.body);
        setOpen(false);
        setCommentField("")
    }

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    }

    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    }



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

                    {searchField === '' ?
                        store.meetingsObj.map(meeting => MeetingListItem(
                            meeting,
                            favoriteArray,
                            handleUnfavorite,
                            handleFavorite,
                            () => { props.handleMeetingDetailClick(meeting.id) }))
                        :
                        fuseMeetingList.search(searchField).map(({ item }) => MeetingListItem(item, favoriteArray))
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
                            <Avatar alt={favoriteCard.user_name} src={favoriteCard.pic_url} />
                            <DialogTitle className={classes.dialog_title}>
                                {favoriteCard.topic}
                            </DialogTitle>
                            <DialogContentText id="speaker" className={classes.dialog_speaker}>
                                {favoriteCard.user_name}
                            </DialogContentText>
                            <DialogContentText id="timestamp" className={classes.dialog_timestamp}>
                                {favoriteCard.display_time}
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
    )
}

export default Student;
