import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';
import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
import { useHistory } from "react-router-dom";
import StudentMeetings from "./StudentMeetings.js"
import StudentHeader from "./StudentHeader.js";
import Bookmark from "./Bookmark.js";
import Favorite from "./Favorite.js";
import fetch from "superagent";



export const Student = () => {
    const [displayedPage, setDisplayedPage] = useState(<StudentMeetings />)
    const [pageIcon, setPageIcon] = useState('meeting');
    const store = useStateStore();
    // const history = useHistory();


    const handleBookmarkClick = async () => {
        const returnedBookmarkArray = await fetch
            .get(store.serverUrl + `/student/bookmark/` + store.studentInfo.id);

        await store.changeBookmarkArray(returnedBookmarkArray.body)
        setPageIcon('bookmark')
        setDisplayedPage(<Bookmark />)
    }

    const handleFavoriteClick = async () => {
        const returnedFavoriteArray = await fetch
            .get(store.serverUrl + `/student/favorite/` + store.studentInfo.id);

        await store.changeFavoriteArray(returnedFavoriteArray.body)
        setPageIcon('favorite')
        setDisplayedPage(<Favorite />)
    }

    const handleMeetingsClick = async () => {

        const newMeetingArray = await fetch
            .post(store.serverUrl + '/student/meetings')
            .send({ student_info: store.studentInfo })

        store.changeMeetingsObj(newMeetingArray.body);
        setPageIcon('meeting')
        setDisplayedPage(<StudentMeetings />)
    }


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