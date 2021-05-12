import React from "react";

import { ListItem, ListItemText, Tooltip, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { primaryMain } from "../../../styles/colors";
export const SubscriptionListItem = (subscription, handleSubscriptionDelete) => {

    return (
        <div>
            <ListItem
                alignItems="flex-start"
                divider={true}
                style={{ borderLeft: `5px solid ${primaryMain}` }}
            >
                <ListItemText
                    primary={subscription.firstName}
                    secondary={`${subscription.studentEmail} - ${subscription.creationDate}`}
                />
                <Tooltip title="Delete Subscription">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleSubscriptionDelete(subscription)}
                    >
                        Delete
                        </Button>
                </Tooltip>

            </ListItem>
        </div>
    );

};