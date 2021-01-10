import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import MeetingDetails from './MeetingDetails.js';
import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
// import { useHistory } from "react-router-dom";
import StudentMeetings from "./StudentMeetings.js"
import StudentHeader from "./StudentHeader.js";
import Bookmark from "./Bookmark.js";
import Favorite from "./Favorite.js";
import fetch from "superagent";



export const Student = () => {
    const [displayedPage, setDisplayedPage] = useState();
    const [pageIcon, setPageIcon] = useState('meeting');
    const store = useStateStore();
    // const history = useHistory();


    const handleBookmarkClick = async () => {
        const returnedBookmarkArray = await fetch
            .get(store.serverUrl + `/student/bookmark/` + store.studentInfo.id);

        await store.changeBookmarkArray(returnedBookmarkArray.body)
        setPageIcon('bookmark')
        setDisplayedPage(<Bookmark
            handleMeetingDetailClick={handleMeetingDetailClick}
        />)
    }

    const handleFavoriteClick = async () => {
        const returnedFavoriteArray = await fetch
            .get(store.serverUrl + `/student/favorite/` + store.studentInfo.id);

        await store.changeFavoriteArray(returnedFavoriteArray.body)
        setPageIcon('favorite')
        setDisplayedPage(<Favorite
            handleMeetingDetailClick={handleMeetingDetailClick}
            handleFavoriteClick={handleFavoriteClick}
        />)
    }

    const handleMeetingsClick = async () => {
        const newMeetingArray = await fetch
            .post(store.serverUrl + '/student/meetings')
            .send({ student_info: store.studentInfo })

        store.changeMeetingsObj(newMeetingArray.body);
        setPageIcon('meeting')
        setDisplayedPage(<StudentMeetings
            handleMeetingDetailClick={handleMeetingDetailClick} />)
    }

    const handleMeetingDetailClick = useCallback(async (meetingId, startTime = 0) => {

        const returnedObject = await fetch
            .get(store.serverUrl + `/student/meetings/${meetingId}`)

        await fetch.get(store.serverUrl + `/student/view/${meetingId}`)
        store.changeMeetingDetails(returnedObject.body.meeting);
        store.changeTranscriptArray(returnedObject.body.transcript);
        store.changeChatArray(returnedObject.body.chat);
        setPageIcon("")
        setDisplayedPage(<MeetingDetails startTime={startTime} />);
    }, [store])


    useEffect(() => {
        setDisplayedPage(<StudentMeetings handleMeetingDetailClick={handleMeetingDetailClick} />)
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