import React from 'react';
import { useObserver } from "mobx-react";
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';

export const LandingPage = (props) => {
    const store = useStateStore();

    return useObserver(() =>
        <Paper elevation={3} >
            <Button
                onClick={() => {
                    store.changeUserType('teacher')

                    window.location.href = "https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://main.dabs41jnm6k92.amplifyapp.com/redirect/";
                }}>
                Teacher
            </Button>
            <Button
                onClick={() => {
                    store.changeUserType('student')

                    window.location.href = "https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://main.dabs41jnm6k92.amplifyapp.com/redirect/";
                }}>
                Student
            </Button>
        </Paper>
    )
}

export default LandingPage