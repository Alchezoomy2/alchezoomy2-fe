import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useStateStore } from "./StoreProvider.js";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/styles";

import { useObserver } from "mobx-react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    iconDiv: {
        display: "flex",
        alignContent: "flex-end",
        justifyContent: "flex-start",
        flexGrow: 1,
        marginLeft: "25px"
    },
    icon: {
        backgroundColor: "rgba(255, 255, 255, 0.44)",
        width: "35px",
        height: "50px",
        display: "flex",
        justifyContent: "center"

    }
}));

export const StudentHeader = ({ pageIcon, handleMeetingsClick, handleBookmarkClick, handleFavoriteClick }) => {
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
                    {/* <div className={classes.icon}> */}
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
                    {/* </div> */}
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

                <Button
                    onClick={() => handleLogout()}
                    variant="outlined"
                    style={{ marginLeft: "25px", border: ".25px" }}>
                    LOGOUT
                </Button>
            </Toolbar>
        </AppBar >
    );
};

export default StudentHeader;
