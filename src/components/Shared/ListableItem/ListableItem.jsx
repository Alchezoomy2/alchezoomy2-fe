import React from "react";

import { ListItem, ListItemText, ListItemAvatar, Avatar, Tooltip, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const ListableItem = (item, handleItemDelete) => {

    return (
        <div style={{ borderLeft: `15px solid ${item.color}` }}>
            <ListItem
                alignItems="flex-start"
                divider={true}
            >
                <ListItemAvatar>
                    <Avatar alt={item.userName} src={item.picUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.userName}
                    secondary={item.email}
                />
                <Tooltip title="Delete">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleItemDelete(item)}
                    >
                        Delete
                        </Button>
                </Tooltip>
            </ListItem>
        </div>
    );

};