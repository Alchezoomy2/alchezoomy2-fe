import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { useStateStore } from "./StoreProvider.js";


export const TeacherAppBar = () => {
    const store = useStateStore();

    return (
        <AppBar position="static" style={{ width: "100%" }}>
            {/* <Typography
                variant="h6" >
                Alchezoomy
            </Typography> */}
            <Typography>
                {store.teacherInfo.userName}
            </Typography>
        </AppBar>
    );
};