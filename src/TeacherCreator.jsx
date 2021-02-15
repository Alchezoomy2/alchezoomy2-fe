import React, { useState } from "react";
import { useStateStore } from "./StoreProvider";
import { Container, Typography, Paper, Avatar, Card, CardContent, Button } from "@material-ui/core";
import { ColorPicker } from "material-ui-color";
import PropTypes from "prop-types";


export const TeacherCreator = ({ handleCreateTeacher }) => {
    const store = useStateStore();
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const { userName, picUrl, email } = store.teacherInfo;

    return (
        <Container>
            <Paper elevation={3} >
                <Typography>
                    {`WELCOME TO ALCHEMZOOMY ${userName}!`}
                </Typography>
                <Typography>
                    {"This appears to be your first visit!  You'll need to create an account to continue.  Is this you?"}
                </Typography>
                <Card style={{ height: "800px" }}>
                    <CardContent>
                        <Avatar alt={userName} src={picUrl} />
                        <Typography>
                            {`Name: ${userName}`}
                        </Typography>
                        <Typography>
                            {`Email: ${email}`}
                        </Typography>
                        <Typography style={{ backgroundColor: selectedColor }}>
                            Post Color:
                            <ColorPicker
                                name='color'
                                value={selectedColor}
                                onChange={color => setSelectedColor(`#${color.hex}`)}
                            />
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleCreateTeacher(selectedColor)}
                        >CREATE USER
                        </Button>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    );
};

TeacherCreator.propTypes = {
    setOpen: PropTypes.func,
    handleCreateTeacher: PropTypes.func
};
