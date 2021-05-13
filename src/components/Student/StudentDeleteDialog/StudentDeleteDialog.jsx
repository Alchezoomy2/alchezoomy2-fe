import React from "react";
import { Divider, Typography, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from "@material-ui/core";
import Transition from "../../Shared/DialogTransition/DialogTransition";
import CommentIcon from "@material-ui/icons/Comment";
import PropTypes from "prop-types";

export default function DeleteDialog({
    open,
    dialogCard,
    handleCloseDialog,
    handleDelete,
    deleteDialogClasses }) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth={true}
        >
            {/* <DialogTitle
                className={deleteDialogClasses.dialogTitle}
            >
                DELETE
            </DialogTitle> */}
            {/* <DialogContent>
                <DialogContentText
                    id="speaker"
                    className={deleteDialogClasses.dialogSpeaker}
                >
                    {dialogCard.userName}
                </DialogContentText>
                <DialogContentText
                    className={deleteDialogClasses.dialogTimestamp}
                    id="timestamp">
                    {dialogCard.displayTime}
                </DialogContentText>
                <Divider />
                <Typography>
                    <CommentIcon fontSize="small" />
                    {`  ${dialogCard.comment}`}
                </Typography>

            </DialogContent> */}
            {/* <DialogActions>
                <Button
                    onClick={handleCloseDialog}
                    color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => { handleDelete(dialogCard.id); }}
                    color="primary">
                    Delete
            </Button>
            </DialogActions> */}
        </Dialog >

    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool,
    dialogCard: PropTypes.object,
    handleCloseDialog: PropTypes.func,
    handleDelete: PropTypes.func,
    deleteDialogClasses: PropTypes.func
};