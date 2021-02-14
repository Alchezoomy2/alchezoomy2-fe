import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";


// import { useStateStore } from './StoreProvider.js'
import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";


export const StudentHeader = ({ pageIcon, handleMeetingsClick, handleBookmarkClick, handleFavoriteClick }) => {
    return useObserver(() =>
        <AppBar position="static" style={{ width: "100%" }}>
            <Toolbar>
                <Typography
                    variant="h6" >
                    Alchezoomy
                </Typography>
                {pageIcon === "meeting" ?
                    <HomeOutlinedIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={handleMeetingsClick}>
                        <HomeIcon />
                    </IconButton>
                }
                {pageIcon === "bookmark" ?
                    <BookmarkBorderIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={handleBookmarkClick}>
                        <BookmarkIcon />
                    </IconButton>
                }
                {pageIcon === "favorite" ?
                    <StarBorderIcon />
                    :
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="home"
                        onClick={handleFavoriteClick}>
                        <StarIcon />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    );
};

export default StudentHeader;
