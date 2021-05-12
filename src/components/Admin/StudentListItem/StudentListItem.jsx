import React from "react";

import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { primaryMain } from "../../../styles/colors";

export default function StudentListItem(item, handleItemDelete) {

    return (
        <div
            style={{ borderLeft: `15px solid ${primaryMain}`, width: "90%", margin: "5px" }}
        >
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
                    onClick={() => handleItemDelete(item)}
                />
            </ListItem>
        </div>
    );

}