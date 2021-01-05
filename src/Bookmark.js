import { useObserver } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import fetch from 'superagent';
import { useStateStore } from './StoreProvider.js'
import { Divider, Paper, List, ListItemText, ListItem, Typography, ListItemAvatar, Avatar, TextField } from '@material-ui/core';
import fuse from 'fuse.js';




export const Bookmark = () => {
    const [searchField, setSearchField] = useState('');
    const store = useStateStore();
    let fuseBookmarkList = new fuse(store.bookmarkArray, {
        keys: ['text', 'speaker', 'comment'],
        threshold: 0.4,
        ignoreLocation: true
    })


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
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