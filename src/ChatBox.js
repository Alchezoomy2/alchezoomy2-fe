import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List, ListItemText } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'

// import ChatLine from './ChatLine.js';

export const ChatBox = () => {
    const store = useStateStore();

    return useObserver(() =>
        <Paper elevation={3}>
            <List>
                {store.chatArray.map(chat =>
                    <div>
                        <ListItemText
                            primary={`${chat.speaker}: ${chat.text}`}
                            secondary={chat.time_stamp}></ListItemText>
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    )
}

export default ChatBox;