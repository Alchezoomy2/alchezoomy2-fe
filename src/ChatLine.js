import React from "react";
import { ListItem, Typography } from '@material-ui/core';


export const ChatLine = (props) => {

    return (
        <ListItem>
            <Typography>{props.chat.timestamp}</Typography>

            <Typography>{props.chat.speaker}</Typography>
            <Typography>{props.chat.text}</Typography>
        </ListItem>
    )
}

export default ChatLine;
