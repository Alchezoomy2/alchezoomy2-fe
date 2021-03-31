import React, { useState, useCallback, useEffect } from "react";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import MeetingDetails from "../../components/MeetingDeatils/MeetingDetails.js";
import { useStateStore } from "../../utils/StoreProvider.js";
import { useStyles } from "./StudentStyles";// import classes from '*.module.css';
// import { useHistory } from "react-router-dom";
import StudentMeetings from "../../components/StudentMeetings/StudentMeetings.js";
import StudentAppBar from "../../components/StudentAppBar/StudentAppBar";
import Bookmark from "../../components/Bookmark/Bookmark.js";
import Favorite from "../../components/Favorite/Favorite.js";
// import fetch from "superagent";
import { fetchAllStudentMeetings, getMeetingDetails } from "../../utils/student-fetches/meeting-fetches.js";
import { fetchAllStudentBookmarks } from "../../utils/student-fetches/bookmark-fetches.js";
import { fetchAllStudentFavorites } from "../../utils/student-fetches/favorite-fetches.js";



export const Student = () => {
    const classes = useStyles();
    const [displayedPage, setDisplayedPage] = useState(null);
    const [pageIcon, setPageIcon] = useState("meeting");
    const [open, setOpen] = useState(true);
    const store = useStateStore();


    const handleBookmarkClick = async () => {
        const returnedBookmarkArray = await fetchAllStudentBookmarks();

        await store.changeBookmarkArray(returnedBookmarkArray);
        setPageIcon("bookmark");
        setDisplayedPage(<Bookmark
            handleMeetingDetailClick={handleMeetingDetailClick}
        />);
    };

    const handleFavoriteClick = async () => {
        const returnedFavoriteArray = await fetchAllStudentFavorites();
        console.log(returnedFavoriteArray);
        await store.changeFavoriteArray(returnedFavoriteArray);
        setPageIcon("favorite");
        setDisplayedPage(<Favorite
            handleMeetingDetailClick={handleMeetingDetailClick}
            handleFavoriteClick={handleFavoriteClick}
        />);
    };

    const handleMeetingsClick = async () => {
        const newMeetingArray = await fetchAllStudentMeetings();
        store.changeMeetingsObj(newMeetingArray);
        setPageIcon("meeting");
        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick} />);
    };

    const handleMeetingDetailClick = useCallback(async (meetingId, startTime = 0) => {

        const returnedObject = await getMeetingDetails(meetingId);

        store.changeMeetingDetails(returnedObject.meeting);
        store.changeTranscriptArray(returnedObject.transcript);
        store.changeChatArray(returnedObject.chat);
        setPageIcon("");
        setDisplayedPage(<MeetingDetails startTime={startTime} />);
    }, [store]);


    useEffect(() => {

        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick}
        />);
        console.log("setOpen");
        setOpen(false);

    }, []);

    return (
        <Grid>
            <StudentAppBar
                handleBookmarkClick={handleBookmarkClick}
                handleFavoriteClick={handleFavoriteClick}
                handleMeetingsClick={handleMeetingsClick}
                pageIcon={pageIcon}
            />
            {displayedPage}
            <Backdrop
                className={classes.backdrop}
                open={open}>
                <CircularProgress />
            </Backdrop>
        </Grid>
    );
};

export default Student;
