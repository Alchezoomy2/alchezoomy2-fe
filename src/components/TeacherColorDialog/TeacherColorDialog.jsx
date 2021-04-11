import { Dialog, DialogContent, DialogTitle, Button, Typography } from "@material-ui/core";
import ColorBlock from "../ColorBlock/ColorBlock";
import React, { useState, useEffect } from "react";
// import { useStateStore } from "../../utils/StoreProvider";
import useStyles from "./TeacherColorDialogStyles";
import { PropTypes } from "mobx-react";

export default function TeacherColorDialog({ hexPalette, closeColorDialog, colorDialog }) {
    // const store = useStateStore();
    const classes = useStyles();
    const [selectedColor, setSelectedColor] = useState(hexPalette[0]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSubmit = () => {
        console.log(selectedColor);
    };

    useEffect(() => {
        console.log(hexPalette);
    }, []);
    return (
        <Dialog
            open={colorDialog}
        >
            <DialogTitle id="color-update"
            >
                Change your display color.
            </DialogTitle>
            <DialogContent
                className={classes.root}
                style={{ borderLeft: `15px solid ${selectedColor}` }}
            >
                {hexPalette[0] ?
                    <div>
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
    hexPalette: PropTypes.array,
    closeColorDialog: PropTypes.func,
    colorDialog: PropTypes.bool
};