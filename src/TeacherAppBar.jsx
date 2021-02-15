import React from "react";
import { AppBar, Avatar, Typography, Toolbar } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";


export const TeacherAppBar = () => {
    const store = useStateStore();

    return (
        <AppBar position="static" style={{ width: "100%", height: "75px" }}>
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
        </AppBar>
    );
};