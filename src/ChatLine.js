import React from "react";
import { ListItem, Typography } from '@material-ui/core';
import { useObserver } from 'mobx-react';


export const ChatLine = (props) => {
    console.log(props.chat)
    return useObserver(() =>
        <ListItem>
            <Typography>{props.chat.timestamp}</Typography>

            <Typography>{props.chat.speaker}</Typography>
            <Typography>{props.chat.text}</Typography>
        </ListItem>
    )
}

export default ChatLine;
