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

        await store.changeBookmarkArray(returnedBookmarkArray)
        setPageIcon('bookmark')
        setDisplayedPage(<Bookmark
            handleMeetingDetailClick={handleMeetingDetailClick}
        />)
    }

    const handleFavoriteClick = async () => {
        console.log('[][][][][][][][][][][][][]')
        console.log('hello!')
        console.log('[][][][][][][][][][][][][]')

        const returnedFavoriteArray = await fetchAllStudentFavorites();
        console.log(returnedFavoriteArray);
        await store.changeFavoriteArray(returnedFavoriteArray)
        setPageIcon('favorite')
        setDisplayedPage(<Favorite
            handleMeetingDetailClick={handleMeetingDetailClick}
            handleFavoriteClick={handleFavoriteClick}
        />)
    }

    const handleMeetingsClick = async () => {
        const newMeetingArray = await fetchAllStudentMeetings();
        store.changeMeetingsObj(newMeetingArray);
        setPageIcon('meeting')
        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick} />)
    }

    const handleMeetingDetailClick = useCallback(async (meetingId, startTime = 0) => {

        const returnedObject = await getMeetingDetails(meetingId)

        store.changeMeetingDetails(returnedObject.meeting);
        store.changeTranscriptArray(returnedObject.transcript);
        store.changeChatArray(returnedObject.chat);
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
