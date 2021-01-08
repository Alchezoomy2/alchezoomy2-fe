import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarIcon from '@material-ui/icons/Star';


// import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
import { useHistory } from "react-router-dom";



export const StudentHeader = (props) => {
    // const store = useStateStore();
    const history = useHistory();


    return useObserver(() =>
        <AppBar position="static" style={{ width: '100%' }}>
            <Toolbar>
                <Typography
                    variant="h6" >
                    Alchezoomy
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="home"
                    onClick={props.handleBookmarkClick}>
                    <BookmarkIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="home"
                    onClick={props.handleBookmarkClick}>
                    <StarIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}


export default StudentHeader;