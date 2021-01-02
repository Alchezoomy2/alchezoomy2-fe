import React from "react";
import { useObserver } from "mobx-react";
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'



export const Bookmark = (props) => {

    const store = useStateStore();
    const handleToggleBookmark = async () => {

        await fetch
            .post(store.serverUrl + '/student/bookmark')
            .send({ chat: this.props.chat })
    }

    return useObserver(() => {
        props.chat.bookmark ?
            <BookmarkIcon
                clickable
                onClick={handleToggleBookmark}
            />
            :
            <BookmarkBorderIcon
                clickable
                onClick={handleToggleBookmark}
            />
    }



    )





}

export default Bookmark;