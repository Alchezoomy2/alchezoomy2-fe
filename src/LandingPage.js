import React from 'react';
import { useObserver } from "mobx-react";
import { userStateStore, useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';

export const LandingPage = (props) => {
    const store = userStateStore();

    return useObserver(() =>
        <Paper elevation={3} >
            <Button
                onClick={() => {
                    store.changeUserType('teacher')
                    console.log('teacher')
                    window.location.href = "https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://alchezoomy2.netlify.app/redirect";
                }}>
                Teacher
            </Button>
            <Button
                onClick={() => {
                    store.changeUserType('student')
                    console.log('student')
                    window.location.href = "https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://alchezoomy2.netlify.app/redirect";
                }}>
                Student
            </Button>
        </Paper>
    )
}

export default LandingPage