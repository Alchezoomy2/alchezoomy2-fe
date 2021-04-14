import React, { useState } from "react";
import { useStateStore } from "../../utils/StoreProvider";
import { Dialog, Typography, Paper, Avatar, Card, CardContent, Button } from "@material-ui/core";
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
            <Paper elevation={3}
                className={classes.root}>
                <Typography>
                    {`WELCOME TO ALCHEMY LECTURES ${userName}!`}
                </Typography>
                <Typography>
                    {"This appears to be your first visit!  You'll need to create an account to continue.  Is this you?"}
                </Typography>
                <Card
                    className={classes.card}
                    style={{ borderLeft: `15px solid ${selectedColor}` }}
                >
                    <CardContent>
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

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleCreateTeacher(selectedColor)}
                        >CREATE USER
                        </Button>
                    </CardContent>
                </Card>
            </Paper>
        </Dialog>
    );
};

TeacherCreator.propTypes = {
    setOpen: PropTypes.func,
    handleCreateTeacher: PropTypes.func
};
