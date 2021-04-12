import React, { useState } from "react";
import fuse from "fuse.js";
import { deleteStudent } from "../../utils/admin-fetches/student-fetches";
import useStyles from "./AdminStudentDashboardStyles";
import { Paper, TextField, Typography, List } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import StudentListItem from "../StudentListItem/StudentListItem";
import DeleteDialog from "../DeleteDialog/DeleteDialog";


export default function AdminStudentDashboard({ returnedStudentArray, openSnackbar, setOpen }) {
    const classes = useStyles();
    const [studentArray, setStudentArray] = useState(returnedStudentArray);
    const [searchField, setSearchField] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletePayload, setDeletePayload] = useState("");


    let fuseStudentList = new fuse(studentArray, {
        keys: ["email", "userName"],
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
        setDeletePayload("");
        setShowDeleteDialog(false);
        setOpen(false);
    };

    return (
        <div className={classes.frame}>
            <Paper
                elevation={3}
                className={classes.root}>
                <Typography
                    variant="h5">
                    Students
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
            </Paper>
            <DeleteDialog
                deletePayload={deletePayload}
                closeDeleteDialog={closeDeleteDialog}
                showDeleteDialog={showDeleteDialog}
            />

        </div>

    );

}

AdminStudentDashboard.propTypes = {
    returnedStudentArray: PropTypes.array,
    openSnackbar: PropTypes.func,
    setOpen: PropTypes.func
};
