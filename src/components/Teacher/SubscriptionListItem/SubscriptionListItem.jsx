import React from "react";

import { ListItem, ListItemText, Tooltip, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { primaryMain } from "../../../styles/colors";
export const SubscriptionListItem = (subscription, handleSubscriptionDelete) => {

    return (
        <div
            style={{ borderLeft: `15px solid ${primaryMain}`, width: "90%", margin: "5px" }}
        >
            <ListItem
                alignItems="flex-start"
                divider={true}
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