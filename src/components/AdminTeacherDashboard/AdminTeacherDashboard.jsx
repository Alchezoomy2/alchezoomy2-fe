import React, { useState } from "react";
import fuse from "fuse.js";
import { inviteTeacher, deleteTeacher } from "../../utils/admin-fetches/teacher-fetches";
import useStyles from "./AdminTeacherDashboardStyles";
import { Paper, TextField, Typography, Button, List } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { ListableItem } from "../ListableItem/ListableItem";
import DeleteDialog from "../DeleteDialog/DeleteDialog";


export default function AdminTeacherDashboard({ returnedTeacherArray, openSnackbar, setOpen }) {
    const classes = useStyles();
    const [teacherArray, setTeacherArray] = useState(returnedTeacherArray);
    const [teacherEmail, setTeacherEmail] = useState("");
    const [searchField, setSearchField] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletePayload, setDeletePayload] = useState("");


    let fuseTeacherList = new fuse(teacherArray, {
        keys: ["email", "userName"],
        threshold: 0.4,
        ignoreLocation: true
    });

    const handleEmailChange = (value) => {
        setTeacherEmail(value);
    };

    const handleTeacherInvite = async () => {
        let teacherEmailArray;

        if (teacherEmail.includes(",")) {
            teacherEmailArray = teacherEmail.split(",").toLowerCase().trim();
        } else {
            teacherEmailArray = [teacherEmail.toLowerCase().trim()];
        }
        await inviteTeacher(teacherEmailArray);
        setTeacherEmail("");
        openSnackbar("success", "Teacher invitation sent");
    };

    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };


    const handleItemDelete = async (teacher) => {
        setDeletePayload({
            label: teacher.userName,
            payload: teacher
        });
        setShowDeleteDialog(true);
        setOpen(true);
    };

    const closeDeleteDialog = async (confirmed, teacher) => {
        if (confirmed) {
            const newTeacherArray = await deleteTeacher(teacher.id);
            openSnackbar("warning", "Teacher deleted");
            setTeacherArray(newTeacherArray);
        }
        setShowDeleteDialog(false);
        setOpen(false);
        setDeletePayload("");
    };

    return (
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
                    <div className={classes.inviteBar}>
                        <Typography
                            variant="h5">
                            Invite Teachers
                        </Typography>
                        <form
                            onSubmit={handleTeacherInvite}>
                            <TextField
                                className={classes.textField}
                                label="Teacher email"
                                value={teacherEmail}
                                onChange={({ target }) => handleEmailChange(target.value)}
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
                            Teachers
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
                            teacherArray.map(item =>
                                ListableItem(
                                    item,
                                    handleItemDelete
                                ))
                            :
                            fuseTeacherList.search(searchField).map(({ item }) => ListableItem(
                                item,
                                handleItemDelete
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

}

AdminTeacherDashboard.propTypes = {
    returnedTeacherArray: PropTypes.array,
    openSnackbar: PropTypes.func,
    setOpen: PropTypes.func,
};