import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "./StoreProvider.js";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";


// import { useStateStore } from './StoreProvider.js'
import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";


export const StudentHeader = ({ pageIcon, handleMeetingsClick, handleBookmarkClick, handleFavoriteClick }) => {
    const store = useStateStore();

    return useObserver(() =>
        <AppBar position="static" style={{ width: "100%" }}>
            <Toolbar>
                <Avatar
                    alt={store.studentInfo.user_name}
                    src={store.studentInfo.pic_url}
                    edge="start"
                />
                <Typography
                    variant="h6"
                    styles={{ marginLeft: "10px" }}>
                    {store.studentInfo.userName}
                </Typography>
                <div
                    styles={{ marginLeft: "10px" }}>
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
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default StudentHeader;
