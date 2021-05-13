import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "../../../utils/StoreProvider.js";

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
        store.changeLoggedOut();
        history.push("/");
    };

    return useObserver(() =>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <div
                    className={classes.iconDiv}>
                    <Tooltip title="Profile">
                        {pageIcon === "profile" ?
                            <IconButton
                                color="secondary"
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
                    </Tooltip>
                    <Tooltip title="Lectures">
                        {pageIcon === "meeting" ?
                            <IconButton
                                color="secondary"
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
                    </Tooltip>
                    <Tooltip title="Bookmarks">
                        {pageIcon === "bookmark" ?
                            <IconButton
                                color="secondary"
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
                    </Tooltip>
                    <Tooltip title="Favorites">
                        {pageIcon === "favorite" ?
                            <IconButton
                                color="secondary"
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
                    </Tooltip>
                </div>
                <Typography
                    variant="button"
                    style={{ marginLeft: "25px" }}>
                    {store.studentInfo.studentEmail}
                </Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    className={classes.logoutButton}
                >
                    LOGOUT
                </Button>
            </Toolbar >
        </AppBar >
    );
}

