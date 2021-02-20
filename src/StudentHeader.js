import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "./StoreProvider.js";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useHistory } from "react-router-dom";


export const StudentHeader = ({ pageIcon, handleMeetingsClick, handleBookmarkClick, handleFavoriteClick }) => {
    const store = useStateStore();
    const history = useHistory();

    const handleLogout = () => {
        store.changeLoggedIn();
        history.push("/");
    };

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
                    style={{ marginLeft: "25px" }}>
                    {store.studentInfo.user_name}
                </Typography>
                <div
                    style={{ marginLeft: "25px" }}>
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
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleLogout()}
                    edge="end"
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default StudentHeader;
