import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "../../StoreProvider.js";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useHistory } from "react-router-dom";
import { useStyles } from "./StudentAppBarStyles";


export default function StudentAppBar({ pageIcon, handleMeetingsClick, handleBookmarkClick, handleFavoriteClick }) {
    const store = useStateStore();
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => {
        store.changeLoggedIn();
        history.push("/");
    };

    return useObserver(() =>
        <AppBar position="static" style={{ width: "100%" }}>
            <Toolbar>
                <div
                    className={classes.iconDiv}>
                    {pageIcon === "meeting" ?
                        <IconButton
                            color="inherit"
                            aria-label="home">
                            <HomeOutlinedIcon />
                        </IconButton>
                        :
                        <IconButton
                            color="inherit"
                            aria-label="home"
                            onClick={handleMeetingsClick}>
                            <HomeIcon />
                        </IconButton>
                    }
                    {pageIcon === "bookmark" ?
                        <IconButton
                            color="inherit"
                            aria-label="bookmark">
                            <BookmarkBorderIcon />
                        </IconButton>
                        :
                        <IconButton
                            color="inherit"
                            aria-label="bookmark"
                            onClick={handleBookmarkClick}>
                            <BookmarkIcon />
                        </IconButton>
                    }
                    {pageIcon === "favorite" ?
                        <IconButton
                            color="inherit"
                            aria-label="favorite">
                            <StarBorderIcon />
                        </IconButton>
                        :
                        <IconButton
                            color="inherit"
                            aria-label="favorite"
                            onClick={handleFavoriteClick}>
                            <StarIcon />
                        </IconButton>
                    }
                </div>
                <Typography
                    variant="h6"
                    style={{ marginLeft: "25px" }}>
                    {store.studentInfo.studentEmail}
                </Typography>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogout}
                    style={{ marginLeft: "25px" }}
                >
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar>
    );
}

