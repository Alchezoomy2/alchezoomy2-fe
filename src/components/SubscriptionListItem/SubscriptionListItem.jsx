import React from "react";

import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const SubscriptionListItem = (subscription, handleSubscriptionDelete) => {

    return (
        <div>
            <ListItem
                alignItems="flex-start"
                divider={true}
            >
                <ListItemText
                    primary={subscription.firstName}
                    secondary={`${subscription.studentEmail} - ${subscription.creationDate}`}
                />
                <DeleteIcon
                    clickable
                    onClick={() => handleSubscriptionDelete(subscription)}
                />
            </ListItem>
        </div>
    );

};