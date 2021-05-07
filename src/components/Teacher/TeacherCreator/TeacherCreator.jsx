import React, { useState } from "react";
import { useStateStore } from "../../../utils/StoreProvider";
import { Dialog, Typography, Avatar, Button, DialogTitle, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./TeacherCreatorStyles";
import ColorBlock from "../ColorBlock/ColorBlock";


export const TeacherCreator = ({ handleCreateTeacher, creatorOpen }) => {
    const store = useStateStore();
    const classes = useStyles();
    const [selectedColor, setSelectedColor] = useState("");
    const { userName, picUrl, email, colorPalette } = store.teacherInfo;

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <Dialog
            open={creatorOpen}>
            <DialogTitle
                id="teacher-creator-title">
                Create User
            </DialogTitle>
            <DialogContent
                className={classes.root}
                style={{ borderLeft: `15px solid ${selectedColor}` }}>
                <Typography>
                    {`WELCOME TO ALCHEMY LECTURES ${userName}!`}
                </Typography>
                <Typography>
                    {"This appears to be your first visit!  You'll need to create an account to continue.  Is this you?"}
                </Typography>
                <Avatar alt={userName} src={picUrl} />
                <Typography>
                    {`Name: ${userName}`}
                </Typography>
                <Typography>
                    {`Email: ${email}`}
                </Typography>
                <Typography>
                    Choose your color:
                        </Typography>
                {colorPalette[0] ?
                    <div
                        className={classes.colorFrame}>
                        <ul className={classes.list}>
                            {colorPalette.map(color => (
                                <ColorBlock
                                    key={color}
                                    color={color}
                                    selectedColor={selectedColor}
                                    handleColorChange={handleColorChange}
                                />
                            ))}
                        </ul>
                    </div>
                    : <Typography>
                        ERROR
                    </Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCreateTeacher(selectedColor)}
                >
                    CREATE USER
                    </Button>
            </DialogContent>
        </Dialog >
    );
};

TeacherCreator.propTypes = {
    setOpen: PropTypes.func,
    handleCreateTeacher: PropTypes.func,
    creatorOpen: PropTypes.bool,
};
