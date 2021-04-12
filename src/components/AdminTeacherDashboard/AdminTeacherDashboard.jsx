import React, { useState } from "react";
import fuse from "fuse.js";
import { inviteTeacher, deleteTeacher } from "../../utils/admin-fetches/teacher-fetches";
import useStyles from "./AdminTeacherDashboardStyles";
import { Paper, TextField, Typography, IconButton, List } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { ListableItem } from "../ListableItem/ListableItem";
import MailIcon from "@material-ui/icons/Mail";
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
            teacherEmailArray = teacherEmail.split(",").toLowerCase();
        } else {
            teacherEmailArray = [teacherEmail.toLowerCase()];
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
        <div className={classes.frame}>
            <Paper
                elevation={3}
                className={classes.root}>
                <div className={classes.searchBar}>
                    <Typography
                        variant="h5">
                        Invite Teachers
               </Typography>
                    <TextField
                        className={classes.textField}
                        label="Teacher email"
                        value={teacherEmail}
                        onChange={({ target }) => handleEmailChange(target.value)}
                        multiline
                    />
                    <IconButton
                        color="inherit"
                        onClick={() => handleTeacherInvite()}>
                        <MailIcon />
                    </IconButton>
                </div>

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
                />
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
            </Paper>
            <DeleteDialog
                deletePayload={deletePayload}
                closeDeleteDialog={closeDeleteDialog}
                showDeleteDialog={showDeleteDialog}
            />
        </div>

    );

}

AdminTeacherDashboard.propTypes = {
    returnedTeacherArray: PropTypes.array,
    openSnackbar: PropTypes.func,
    setOpen: PropTypes.func,
};