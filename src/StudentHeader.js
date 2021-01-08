import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';


// import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
import { useHistory } from "react-router-dom";



export const StudentHeader = () => {
    // const store = useStateStore();
    const history = useHistory();


    return useObserver(() =>
        <AppBar position="static" style={{ width: '100%' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6" >
                    Alchezoomy
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="home"
                    onClick={() => history.push('/')}>
                    <BookmarkIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}


export default StudentHeader;