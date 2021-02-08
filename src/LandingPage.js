import React from 'react';
import { useObserver } from "mobx-react";
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';


export const LandingPage = () => {
    const store = useStateStore();
    const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL
    window.alert(zoomAPIurl)
    return useObserver(() =>
        <Paper elevation={3} >
            <Button
                onClick={() => {
                    store.changeUserType('teacher')
                    window.location.href = zoomAPIurl;
                }}>
                Teacher
            </Button>
            <Button
                onClick={() => {
                    store.changeUserType('student')
                    window.location.href = zoomAPIurl;
                }}>
                Student
            </Button>
        </Paper>
    )
}

export default LandingPage