import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';


// import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


export const StudentHeader = (props) => {
    // const store = useStateStore();
    // const history = useHistory();



    return useObserver(() =>
        <AppBar position="static" style={{ width: '100%' }}>
            <Toolbar>
                <Typography
                    variant="h6" >
                    Alchezoomy
                </Typography>
                {props.pageIcon === 'meeting' ?
                    <HomeOutlinedIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={props.handleMeetingsClick}>
                        <HomeIcon />
                    </IconButton>
                }
                {props.pageIcon === 'bookmark' ?
                    <BookmarkBorderIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={props.handleBookmarkClick}>
                        <BookmarkIcon />
                    </IconButton>
                }
                {props.pageIcon === 'favorite' ?
                    <StarBorderIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={props.handleFavoriteClick}>
                        <StarIcon />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}


export default StudentHeader;