import React from "react";

import { ListItem, ListItemText, Tooltip, Button } from "@material-ui/core";
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
                <Tooltip title="Delete">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleSubscriptionDelete(subscription)}
                    >
                        Delete Sub
                        </Button>
                </Tooltip>

            </ListItem>
        </div>
    );

};