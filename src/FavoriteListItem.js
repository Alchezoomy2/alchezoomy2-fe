import { useObserver } from "mobx-react"
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';



export const FavoriteListItem = (favorite, handleDeleteClick, handelOpenMeeting) => {

    return useObserver(() =>

        <div>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={favorite.user_name} src={favorite.pic_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={favorite.topic}
                    secondary={favorite.display_time}
                />
                <ListItemText
                    primary={favorite.comment}
                />
                <div>
                    <DeleteIcon
                        clickable
                        onClick={() => handleDeleteClick(favorite)}
                    />
                    <ReplyIcon
                        style={{ transform: 'scaleX(-1)' }}
                        onClick={() => handleOpenMeeting(favorite)}
                    />
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
}
