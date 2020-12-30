import React from 'react';
import { useObserver } from "mobx-react";
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';

export const LandingPage = () => {
    const store = useStateStore();
    console.log(store.serverUrl)
    console.log(store.zoomAPIurl)

    return useObserver(() =>
        <Paper elevation={3} >
            <Button
                onClick={() => {
                    store.changeUserType('teacher')
                    window.location.href = store.zoomAPIurl;
                }}>
                Teacher
            </Button>
            <Button
                onClick={() => {
                    store.changeUserType('student')
                    window.location.href = store.zoomAPIurl;
                }}>
                Student
            </Button>
        </Paper>
    )
}

export default LandingPage