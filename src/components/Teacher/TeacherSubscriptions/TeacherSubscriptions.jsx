import { Paper, TextField, Typography, Button, List } from "@material-ui/core";

import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "../../../utils/StoreProvider";
import useStyles from "./teacherSubscriptionStyles";
import fuse from "fuse.js";
import { SubscriptionListItem } from "../SubscriptionListItem/SubscriptionListItem";
import { inviteStudent, deleteSubscription } from "../../../utils/teacher-fetches/subscription-fetches";
import DeleteDialog from "../../Shared/ListableItem/DeleteDialog/DeleteDialog";

export const TeacherSubscriptions = ({ returnedSubscriptionArray, openSnackbar, setOpen }) => {
    const store = useStateStore();
    const classes = useStyles();
    const [subscriptionArray, setSubscriptionArray] = useState(returnedSubscriptionArray);
    const [studentEmail, setStudentEmail] = useState("");
    const [searchField, setSearchField] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletePayload, setDeletePayload] = useState("");


    let fuseSubscriptionList = new fuse(subscriptionArray, {
        keys: ["studentEmail", "creationDate", "firstName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleEmailChange = (value) => {
        setStudentEmail(value);
    };

    const handleStudentInvite = async (e) => {
        e.preventDefault();
        let studentEmailArray;
        if (studentEmail.includes("@") && studentEmail.includes(".")) {
            if (studentEmail.includes(",")) {
                studentEmailArray = studentEmail.split(",").toLowerCase().trim();
            } else {
                studentEmailArray = [studentEmail.toLowerCase().trim()];
            }

            await inviteStudent(studentEmailArray, store.teacherInfo);
            setStudentEmail("");
            openSnackbar("success", "Student Invited");
        }
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSubscriptionDelete = async (subscription) => {
        setDeletePayload({
            label: subscription.studentEmail,
            payload: subscription
        });
        setShowDeleteDialog(true);
        setOpen(true);
    };

    const closeDeleteDialog = async (confirmed, subscription) => {
        if (confirmed) {
            const newSubscriptionArray = await deleteSubscription(subscription.id);
            setSubscriptionArray(newSubscriptionArray);
            setShowDeleteDialog(false);
            setOpen(false);
        }
        setShowDeleteDialog(false);
        setOpen(false);
        setDeletePayload("");


    };

    return useObserver(() =>
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
                    <div className={classes.inviteBar}>
                        <Typography
                            variant="h5">
                            Invite Students
                        </Typography>
                        <form
                            onSubmit={handleStudentInvite}>
                            <TextField
                                className={classes.textField}
                                label="Student email"
                                value={studentEmail}
                                onChange={({ target }) => handleEmailChange(target.value)}
                                autocomplete="off"
                                variant="outlined"
                                multiline
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                INVITE
                            </Button>
                        </form>
                    </div>
                    <div className={classes.searchBar}>
                        <Typography
                            variant="h5">
                            Search Subscriptions
                        </Typography>
                        <TextField
                            id="search"
                            label="search"
                            fullWidth
                            variant="outlined"
                            onChange={handleSearchChange}
                            autocomplete="off"
                        />
                    </div>
                    <List className={classes.list}>
                        {searchField === "" ?
                            subscriptionArray.map(subscription => SubscriptionListItem(
                                subscription,
                                handleSubscriptionDelete
                            ))
                            :
                            fuseSubscriptionList.search(searchField).map(({ item }) => SubscriptionListItem(
                                item,
                                handleSubscriptionDelete
                            ))
                        }
                    </List>
                </div>
            </Paper>
            <DeleteDialog
                deletePayload={deletePayload}
                closeDeleteDialog={closeDeleteDialog}
                showDeleteDialog={showDeleteDialog}
            />

        </div >
    );
};
