import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List } from '@material-ui/core';
import ChatLine from './ChatLine.js';
export const ChatBox = (props) => {


    return useObserver(() => {
        <Paper elevation={3}>
            <List>
                {props.chatArray.map(chat =>
                    <div>
                        <ChatLine chat={chat} />
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    })
}