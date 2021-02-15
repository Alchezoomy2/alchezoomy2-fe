import React from "react";
import { AppBar, Avatar, Typography, Toolbar, IconButton } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";
import MailIcon from "@material-ui/icons/Mail";

export const TeacherAppBar = () => {
    const store = useStateStore();

    return (
        <AppBar position="static" style={{ width: "100%", height: "65px" }}>
            <Toolbar>
                <Avatar
                    alt={store.teacherInfo.userName}
                    src={store.teacherInfo.picUrl}
                    edge="start"
                />
                <Typography>
                    {store.teacherInfo.userName}
                </Typography>
            </Toolbar>
            <IconButton edge="end" color="inherit">
                <MailIcon />
            </IconButton>

        </AppBar>
    );
};