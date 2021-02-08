import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core'
import MeetingDetails from './MeetingDetails.js';
import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
// import { useHistory } from "react-router-dom";
import StudentMeetings from "./StudentMeetings.js"
import StudentHeader from "./StudentHeader.js";
import Bookmark from "./Bookmark.js";
import Favorite from "./Favorite.js";
// import fetch from "superagent";
import { fetchAllStudentMeetings, getMeetingDetails } from './utils/student-fetches/meeting-fetches.js'
import { fetchAllStudentBookmarks } from './utils/student-fetches/bookmark-fetches.js'
import { fetchAllStudentFavorites } from './utils/student-fetches/favorite-fetches.js';



export const Student = () => {
    const [displayedPage, setDisplayedPage] = useState();
    const [pageIcon, setPageIcon] = useState('meeting');
    const store = useStateStore();

    const handleBookmarkClick = async () => {
        const returnedBookmarkArray = await fetchAllStudentBookmarks();

        await store.changeBookmarkArray(returnedBookmarkArray.body)
        setPageIcon('bookmark')
        setDisplayedPage(<Bookmark
            handleMeetingDetailClick={handleMeetingDetailClick}
        />)
    }

    const handleFavoriteClick = async () => {
        const returnedFavoriteArray = await fetchAllStudentFavorites

        await store.changeFavoriteArray(returnedFavoriteArray.body)
        setPageIcon('favorite')
        setDisplayedPage(<Favorite
            handleMeetingDetailClick={handleMeetingDetailClick}
            handleFavoriteClick={handleFavoriteClick}
        />)
    }

    const handleMeetingsClick = async () => {
        const newMeetingArray = await fetchAllStudentMeetings();
        store.changeMeetingsObj(newMeetingArray.body);
        setPageIcon('meeting')
        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick} />)
    }

    const handleMeetingDetailClick = useCallback(async (meetingId, startTime = 0) => {

        const returnedObject = await getMeetingDetails(meetingId)

        store.changeMeetingDetails(returnedObject.body.meeting);
        store.changeTranscriptArray(returnedObject.body.transcript);
        store.changeChatArray(returnedObject.body.chat);
        setPageIcon("")
        setDisplayedPage(<MeetingDetails startTime={startTime} />);
    }, [store])


    useEffect(() => {
        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick}
        />)
    }, [handleMeetingDetailClick])

    return useObserver(() =>
        <Grid>
            <StudentHeader
                handleBookmarkClick={handleBookmarkClick}
                handleFavoriteClick={handleFavoriteClick}
                handleMeetingsClick={handleMeetingsClick}
                pageIcon={pageIcon}
            />
            {displayedPage}
        </Grid>
    )
}

export default Student;