import { Paper, TextField, Typography, IconButton, List } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useStateStore } from "../../utils/StoreProvider";
import useStyles from "./teacherSubscriptionStyles";
import fuse from "fuse.js";
import { SubscriptionListItem } from "../SubscriptionListItem/SubscriptionListItem";
import { inviteStudent, deleteSubscription } from "../../utils/teacher-fetches/subscription-fetches";

export const TeacherSubscriptions = ({ returnedSubscriptionArray, openSnackbar }) => {
    const store = useStateStore();
    const classes = useStyles();
    const [subscriptionArray, setSubscriptionArray] = useState(returnedSubscriptionArray);
    const [studentEmail, setStudentEmail] = useState("");
    const [searchField, setSearchField] = useState("");

    let fuseSubscriptionList = new fuse(subscriptionArray, {
        keys: ["email", "creationDate", "userName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleEmailChange = (value) => {
        setStudentEmail(value);
    };

    const handleStudentInvite = async () => {
        let studentEmailArray;
        if (studentEmail.includes("@") && studentEmail.includes(".")) {
            if (studentEmail.includes(",")) {
                studentEmailArray = studentEmail.split(",").toLowerCase();
            } else {
                studentEmailArray = [studentEmail.toLowerCase()];
            }
            await inviteStudent(studentEmailArray, store.teacherInfo);
            setStudentEmail("");
            openSnackbar("success", "Student Invited");
        }
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSubscriptionDelete = async (subscriptionId) => {
        const newSubscriptionArray = await deleteSubscription(subscriptionId);
        setSubscriptionArray(newSubscriptionArray);
    };

    return useObserver(() =>
        <div className={classes.frame}>
            <Paper
                elevation={3}
                className={classes.root}>
                <div className={classes.searchBar}>
                    <Typography
                        variant="h5">
                        Invite Students
                   </Typography>
                    <TextField
                        className={classes.textField}
                        label="Student email"
                        value={studentEmail}
                        onChange={({ target }) => handleEmailChange(target.value)}
                        multiline
                    />
                    <IconButton
                        color="inherit"
                        onClick={() => handleStudentInvite()}>
                        <MailIcon />
                    </IconButton>
                </div>

                <Typography
                    variant="h5">
                    Subscriptions
                   </Typography>
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
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
            </Paper>
        </div>
    );
};
