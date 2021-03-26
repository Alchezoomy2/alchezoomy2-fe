import React, { useEffect } from "react";
import { Paper, Button } from "@material-ui/core";
import { useStyles } from "./TeacherLoginStyles.js.js";
import { useParams } from "react-router-dom";
import { useStateStore } from "./StoreProvider.js";

const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export default function TeacherInvite() {
    const store = useStateStore();
    const classes = useStyles();
    const { jwt } = useParams();

    useEffect(() => {
        store.changeJWT(jwt);
    }, []);

    return (
        <Paper elevation={3} className={classes.root}>
            <div>
                <Paper elevation={2}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo image"
                    />
                </Paper>
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => window.location.href = zoomAPIurl}
                    >
                        SIGN IN WITH ZOOM
                    </Button>
                </div>
            </div>
        </Paper>
    );
}