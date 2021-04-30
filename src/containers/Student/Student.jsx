import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MeetingDetails from "../../components/MeetingDetails/MeetingDetails";
import { useStateStore } from "../../utils/StoreProvider.js";
// import { useHistory } from "react-router-dom";
import StudentMeetings from "../../components/StudentMeetings/StudentMeetings.js";
import StudentAppBar from "../../components/StudentAppBar/StudentAppBar";
import Bookmark from "../../components/Bookmark/Bookmark.js";
import Favorite from "../../components/Favorite/Favorite.js";
import StudentProfile from "../../components/StudentProfile/StudentProfile";
import snackBar from "../../hooks/snackBar/snackBar";
import Footer from "../../components/Footer/Footer";
import { fetchAllStudentMeetings, getMeetingDetails } from "../../utils/student-fetches/meeting-fetches.js";
import { fetchAllStudentBookmarks } from "../../utils/student-fetches/bookmark-fetches.js";
import { fetchAllStudentFavorites } from "../../utils/student-fetches/favorite-fetches.js";



export const Student = () => {
    const { openSnackbar, SnackbarComponent } = snackBar();
    const [displayedPage, setDisplayedPage] = useState(null);
    const [pageIcon, setPageIcon] = useState("meeting");
    const store = useStateStore();

    const handleProfileClick = async () => {
        setPageIcon("profile");
        setDisplayedPage(<StudentProfile
            openSnackbar={openSnackbar}
        />);
    };


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
    }, []);

    return (
        <>
            <Grid>
                <StudentAppBar
                    handleBookmarkClick={handleBookmarkClick}
                    handleFavoriteClick={handleFavoriteClick}
                    handleMeetingsClick={handleMeetingsClick}
                    handleProfileClick={handleProfileClick}
                    pageIcon={pageIcon}
                />
                {displayedPage}
                <Footer />
            </Grid>
            <SnackbarComponent />
        </>
    );
};

export default Student;
