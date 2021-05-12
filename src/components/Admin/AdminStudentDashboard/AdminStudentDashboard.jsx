import React, { useState } from "react";
import fuse from "fuse.js";
import { deleteStudent } from "../../../utils/admin-fetches/student-fetches";
import useStyles from "./AdminStudentDashboardStyles";
import { Paper, TextField, Typography, List } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import StudentListItem from "../StudentListItem/StudentListItem";
import DeleteDialog from "../../Shared/DeleteDialog/DeleteDialog";


export default function AdminStudentDashboard({ returnedStudentArray, openSnackbar, setOpen }) {
    const classes = useStyles();
    const [studentArray, setStudentArray] = useState(returnedStudentArray);
    const [searchField, setSearchField] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletePayload, setDeletePayload] = useState("");


    let fuseStudentList = new fuse(studentArray, {
        keys: ["studentEmail", "firstName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleItemDelete = async (student) => {
        setDeletePayload({
            label: student.studentEmail,
            payload: student
        });
        setShowDeleteDialog(true);
        setOpen(true);
    };

    const closeDeleteDialog = async (confirmed, student) => {
        if (confirmed) {
            const newStudentArray = await deleteStudent(student.id);
            openSnackbar("warning", "Student deleted");
            setStudentArray(newStudentArray);
        }
        setOpen(false);
        setShowDeleteDialog(false);
        setDeletePayload("");
    };

    return (
        <div className={classes.root}>
            <Paper
                elevation={3}
                maxWidth="xl"
                className={classes.frame}>
                <div className={classes.component}>
                    <Typography
                        variant="h5">
                        Search Students
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
                            studentArray.map(item =>
                                StudentListItem(
                                    item,
                                    handleItemDelete
                                ))
                            :
                            fuseStudentList.search(searchField).map(({ item }) => StudentListItem(
                                item,
                                handleItemDelete
                            ))
                        }
                    </List>
                </div>
            </Paper>
            {deletePayload ?
                <DeleteDialog
                    deletePayload={deletePayload}
                    closeDeleteDialog={closeDeleteDialog}
                    showDeleteDialog={showDeleteDialog}
                />
                : null
            }

        </div>

    );

}

AdminStudentDashboard.propTypes = {
    returnedStudentArray: PropTypes.array,
    openSnackbar: PropTypes.func,
    setOpen: PropTypes.func
};
