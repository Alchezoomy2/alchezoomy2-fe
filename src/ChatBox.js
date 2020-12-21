import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List, ListItemText } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'

// import ChatLine from './ChatLine.js';

export const ChatBox = () => {
    const store = useStateStore();
    console.log('CHATBOX!')
    console.log(store.chatArray.map(chat => chat.text))

    return useObserver(() =>
        <Paper elevation={3}>
            <List>
                {store.chatArray.map(chat =>
                    <div>
                        <ListItemText
                            primary={chat.speaker}
                            secondary={chat.text}></ListItemText>
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    )
}

export default ChatBox;