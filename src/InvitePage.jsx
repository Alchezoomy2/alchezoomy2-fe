import React, { useEffect } from "react";
import { useStateStore } from "./StoreProvider.js";
import { useProps } from "react-router-dom";
import { Paper, Typography, Button } from "@material-ui/core";
import { useObserver } from "mobx-react";


const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export const InvitePage = () => {
    const store = useStateStore();
    const { jwt } = useProps();

    useEffect(() => {
        store.changeJWT(jwt);
        store.changeUserType("invite");
    }, []);


    return useObserver(() =>
        <Paper elevation={3} >
            <Typography>
                {`WELCOME TO ALCHEZOOMY!
               YOU BEEN INVITED TO JOIN!
               PUSH THIS BUTTON TO PROCEED!
               `}
            </Typography>
            <Button onClick={() => {
                window.location.href = zoomAPIurl;
            }}>
                LOGIN INTO ZOOM!
            </Button>

        </Paper>


    );

};

export default InvitePage;
