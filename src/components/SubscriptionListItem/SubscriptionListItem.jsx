import React from "react";

import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const SubscriptionListItem = (subscription, handleSubscriptionDelete) => {

    return (
        <div>
            <ListItem
                alignItems="flex-start"
                divider={true}
            >
                <ListItemAvatar>
                    <Avatar alt={subscription.userName} src={subscription.picUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={subscription.userName}
                    secondary={subscription.email}
                />
                <DeleteIcon
                    clickable
                    onClick={() => handleSubscriptionDelete(subscription.id)}
                />
            </ListItem>
        </div>
    );

};