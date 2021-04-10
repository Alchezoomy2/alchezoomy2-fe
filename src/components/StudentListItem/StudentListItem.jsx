import React from "react";

import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function StudentListItem(item, handleItemDelete) {

    return (
        <div>
            <ListItem
                alignItems="flex-start"
                divider={true}
            >
                <ListItemText
                    primary={item.firstName}
                    secondary={item.studentEmail}
                />
                <DeleteIcon
                    clickable
                    onClick={() => handleItemDelete(item.id)}
                />
            </ListItem>
        </div>
    );

}