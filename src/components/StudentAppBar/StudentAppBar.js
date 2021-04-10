import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "../../utils/StoreProvider.js";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useHistory } from "react-router-dom";
import { useStyles } from "./StudentAppBarStyles";


export default function StudentAppBar({
    pageIcon,
    handleMeetingsClick,
    handleBookmarkClick,
    handleFavoriteClick,
    handleProfileClick }) {

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
                    {pageIcon === "profile" ?
                        <IconButton
                            color="inherit"
                            aria-label="profile">
                            <PersonOutlineIcon />
                        </IconButton>
                        :
                        <IconButton
                            color="inherit"
                            aria-label="profile"
                            onClick={handleProfileClick}>
                            <PersonIcon />
                        </IconButton>

                    }
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
            </Toolbar >
        </AppBar >
    );
}

