import React from "react";
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { useObserver } from 'mobx-react';


export const ChatLine = (props) => {
    console.log(props.chat)
    return useObserver(() =>
        <ListItemText
            primary={props.chat.speaker}
            secondary={props.chat.text}></ListItemText>
            {/* <p>HI!</p>
            <Typography>{props.chat.timestamp}</Typography>

            <Typography>{props.chat.speaker}</Typography>
            <Typography>{props.chat.text}</Typography> */}
        </ListItem >
    )
}

export default ChatLine;
