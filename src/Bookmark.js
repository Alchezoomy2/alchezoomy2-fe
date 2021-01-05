import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import { useStateStore } from './StoreProvider.js'
import { Divider, Paper, List, ListItemText, ListItem, Typography, ListItemAvatar, Avatar, TextField } from '@material-ui/core';
import fuse from 'fuse.js';
import fetch from 'superagent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";



import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    reply_icon: {
        transform: 'scaleX(-1)'
    }
}))



export const Bookmark = () => {
    const [searchField, setSearchField] = useState('');
    const store = useStateStore();
    const classes = useStyles();
    const history = useHistory();
    let fuseBookmarkList = new fuse(store.bookmarkArray, {
        keys: ['text', 'speaker', 'comment'],
        threshold: 0.4,
        ignoreLocation: true
    })


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    }

    const handleDeleteBookmark = async (bookmarkId) => {

        const newBookmarkArray = await fetch
            .delete(store.serverUrl + '/student/bookmark/' + bookmarkId)
        store.changeBookmarkArray(newBookmarkArray.body);
    }

    const handleOpenMeeting = async (bookmark) => {
        const returnedObject = await fetch
            .get(store.serverUrl + `/student/meetings/${bookmark.meeting_id}`)

        await fetch.get(store.serverUrl + `/student/view/${bookmark.meeting_id}`)
        store.changeMeetingDetails(returnedObject.body.meeting);
        store.changeTranscriptArray(returnedObject.body.transcript);
        store.changeChatArray(returnedObject.body.chat);

        history.push(`/meeting/${bookmark.timestamp}`)
    }

    const listItems = (bookmark) => {

        return <div>

            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={bookmark.user_name} src={bookmark.pic_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={bookmark.topic}
                    secondary={bookmark.display_time}
                />
                <ListItemText
                    primary={`${bookmark.speaker}:  ${bookmark.text}`}
                    secondary={bookmark.comment}
                />
                <div>
                    <DeleteIcon
                        clickable
                        onClick={() => handleDeleteBookmark(bookmark.id)}
                    />
                    <ReplyIcon
                        className={classes.reply_icon}
                        onClick={() => handleOpenMeeting(bookmark)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    }


    return useObserver(() =>

        <div>
            <Paper elevation={3}>
                <Typography
                    variant='h5'>
                    Bookmarks
                    </Typography>
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
                <List>
                    {searchField === '' ?
                        store.bookmarkArray.map(bookmark => listItems(bookmark))
                        :
                        fuseBookmarkList.search(searchField).map(({ item }) => listItems(item))
                    }
                </List>
            </Paper>



        </div>

    )
}

export default Bookmark;