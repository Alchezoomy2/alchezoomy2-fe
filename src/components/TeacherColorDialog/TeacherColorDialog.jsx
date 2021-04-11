import { Dialog, DialogContent, DialogTitle, Button, Typography } from "@material-ui/core";
import ColorBlock from "../ColorBlock/ColorBlock";
import React, { useState } from "react";
// import { useStateStore } from "../../utils/StoreProvider";
import useStyles from "./TeacherColorDialogStyles";
import { PropTypes } from "mobx-react";

export default function TeacherColorDialog({ returnedHexPalette, closeColorDialog, colorDialog }) {
    // const store = useStateStore();
    const classes = useStyles();
    const [selectedColor, setSelectedColor] = useState(returnedHexPalette[0]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSubmit = () => {
        console.log(selectedColor);
    };

    return (
        <Dialog
            open={colorDialog}
            style={{ borderLeft: `15px solid ${selectedColor}` }}
        >
            <DialogTitle id="color-update"
            >
                Change your display color.
            </DialogTitle>
            <DialogContent
                className={classes.root}>
                {returnedHexPalette[0] ?
                    <div>
                        <ul className={classes.list}>
                            {returnedHexPalette.map(color => (
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
                            color="primary">
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
    returnedHexPalette: PropTypes.array,
    closeColorDialog: PropTypes.func,
    colorDialog: PropTypes.bool
};