import { Dialog, DialogContent, DialogTitle, Button, Typography } from "@material-ui/core";
import ColorBlock from "../ColorBlock/ColorBlock";
import React, { useState } from "react";
import { useStateStore } from "../../utils/StoreProvider";
import useStyles from "./TeacherColorDialogStyles";
import { PropTypes } from "mobx-react";
import { changeColor } from "../../utils/teacher-fetches/auth-fetches";

export default function TeacherColorDialog({ hexPalette, closeColorDialog, colorDialog }) {
    const store = useStateStore();
    const classes = useStyles();
    const [selectedColor, setSelectedColor] = useState(store.teacherInfo.color);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSubmit = async () => {
        const { updatedTeacher, updatedMeetings } = await changeColor(store.teacherInfo.id, selectedColor);
        store.changeTeacherInfo(updatedTeacher);
        store.changeMeetingsObj(updatedMeetings);
        closeColorDialog();
    };

    return (
        <Dialog
            open={colorDialog}
        >
            <DialogTitle
                id="color-update"
                className={classes.title}
            >
                Change your display color.
            </DialogTitle>
            <DialogContent
                className={classes.root}
                style={{ borderLeft: `15px solid ${selectedColor}` }}
            >
                {hexPalette[0] ?
                    <div
                        className={classes.colorFrame}>
                        <ul className={classes.list}>
                            {hexPalette.map(color => (
                                <ColorBlock
                                    key={color}
                                    color={color}
                                    selectedColor={selectedColor}
                                    handleColorChange={handleColorChange}
                                />
                            ))}
                        </ul>
                        <Button
                            onClick={closeColorDialog}
                            variant="contained"
                            color="secondary">
                            CANCEL
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary">
                            SUMBIT
                            </Button>
                    </div>
                    : <Typography>
                        Trouble
                    </Typography>}
            </DialogContent>

        </Dialog >
    );
}

TeacherColorDialog.propTypes = {
    hexPalette: PropTypes.array,
    closeColorDialog: PropTypes.func,
    colorDialog: PropTypes.bool
};