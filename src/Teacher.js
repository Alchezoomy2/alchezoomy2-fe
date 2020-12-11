import React from 'react'
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';
// import fetch from 'superagent';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";


export const Teacher = async () => {
    const store = useStateStore();
    console.log(store.code)
    // try {
    //     const returnedObject = await fetch
    //         .post(store.serverUrl + '/teacher/oauth')
    //         .send({ code: store.code });

    //     store.changeTeacherInfo(returnedObject.body);
    //     console.log(store.changeTeacherInfo)
    // }
    // catch (e) {
    //     throw e;
    // }

    return useObserver(() =>
        <Paper elevation={3} >
            <Link to='/'><Button >HOME</Button></Link>
        </Paper>

    )
}

export default Teacher;