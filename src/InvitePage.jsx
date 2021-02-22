import React, { useEffect } from "react";
import { useStateStore } from "./StoreProvider.js";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@material-ui/core";
import { useObserver } from "mobx-react";
import { useStyles } from "./styles/landingPage.js";


const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export const InvitePage = () => {
    const store = useStateStore();
    const { jwt } = useParams();
    const classes = useStyles();


    useEffect(() => {
        store.changeJWT(jwt);
        store.changeUserType("invite");
    }, []);


    return useObserver(() =>
        <Paper elevation={3} className={classes.root}>
            <div>
                <Paper elevation={2}>
                    <img
                        className={classes.mainLogo}
                        src="/images/alchezoomy-logo.png"
                        alt="logo image" />
                </Paper>
            </div>
            <div className={classes.inviteText}>
                <Typography
                    variant="body1">

                    {"Welcome to Alchezoomy!\n"}
                    {"You have been invited to view lextures from Alchemy Code Lab!"}
                    <br />
                    {"To create your account, you'll need to sign in via Zoom."}
                    <p>
                        {"We will use your name & email address to identify you, but we wont have access to any other of your personal data."}
                    </p>
                </Typography>
            </div>

            <Button
                variant="contained"
                onClick={() => {
                    window.location.href = zoomAPIurl;
                }}>
                LOGIN WITH ZOOM!
            </Button>

        </Paper>


    );

};

export default InvitePage;
