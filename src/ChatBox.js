import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { Divider, Paper, List, ListItemText, ListItem, Typography, Slide, Dialog, Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    list: {
        height: '200px',
        overflow: 'scroll',
    },
    list_item: {
        width: '650px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const ChatBox = () => {
    const store = useStateStore();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();

    const handleBookmark = (chatItem) => {
        setBookmarkCard(chatItem);
        console.log(bookmarkCard)
        setOpen(true);
    }

    const saveBookmark = async () => {
        console.log(bookmarkCard.timestamp)
    }




    return useObserver(() =>
        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h2'>
                    CHAT
            </Typography>
                <List className={classes.list}>
                    {store.chatArray.map(chat =>
                        <div>
                            <ListItem className={classes.list_item}>
                                <BookmarkBorderIcon
                                    clickable
                                    onClick={() => { handleBookmark(chat) }}
                                />
                                <ListItemText
                                    primary={`${chat.speaker} ${chat.text}`}
                                    secondary={chat.timestamp} />
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
            </Paper>
            {bookmarkCard ?

                <Dialog
                    open={open}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText>
                            SAVE THIS CHAT?
                </DialogContentText>
                        <DialogContentText id="speaker">
                            {bookmarkCard.speaker}
                        </DialogContentText>
                        {/* <DialogContentText id="speaker">
                            {bookmarkCard.speaker}
                        </DialogContentText> */}
                        <DialogContentText id="timestamp">
                            {bookmarkCard.timestamp}
                        </DialogContentText>
                        <DialogContentText id="text">
                            {bookmarkCard.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            color="primary">
                            Disagree
                    </Button>
                        <Button
                            onClick={saveBookmark}
                            color="primary">
                            Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                :
                "LOADING!"
            }
        </div>
    )
}

export default ChatBox;