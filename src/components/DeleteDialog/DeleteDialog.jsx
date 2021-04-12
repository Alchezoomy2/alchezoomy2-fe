import { Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { PropTypes } from "mobx-react";


export default function DeleteDialog({ deletePayload, closeDeleteDialog, showDeleteDialog }) {

    return (
        <Dialog
            open={showDeleteDialog}
        >
            <DialogTitle
                id="confirm-delete">
                {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="confirm-delete-content"
                >
                    {`Delete ${deletePayload.label}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={closeDeleteDialog}
                    color="primary">{"CANCEL"}</Button>
                <Button onClick={closeDeleteDialog}
                    color="primary">{"DELETE"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    deletePayload: PropTypes.object,
    closeDeleteDialog: PropTypes.func,
    showDeleteDialog: PropTypes.func
};