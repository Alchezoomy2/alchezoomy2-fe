import React from "react";
import { AppBar, Avatar, Typography } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";


export const TeacherAppBar = () => {
    const store = useStateStore();

    return (
        <AppBar position="static" style={{ width: "100%", height: "75px" }}>
            <Avatar alt={store.teacherInfo.userName} src={store.teacherInfo.picUrl} />
            <Typography>
                {store.teacherInfo.userName}
            </Typography>
        </AppBar>
    );
};