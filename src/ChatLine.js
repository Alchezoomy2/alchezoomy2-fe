import React from "react";
import { ListItem, Typography } from '@material-ui/core';


export const ChatLine = (props) => {

    return (
        <ListItem>
            <Typography>{props.chat.speaker}</Typography>
        </ListItem>
    )
}
