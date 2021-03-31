import React from "react";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./TeacherLoginStyles";
const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;


export default function TeacherLogin() {
    const classes = useStyles();

    return (
        <div>
            <Paper elevation={3}>
                <div>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo image" />
                    </Paper>
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => window.location.href = zoomAPIurl}
                >
                    SIGN IN WITH ZOOM
                    </Button>
            </Paper>
        </div>
    );
}