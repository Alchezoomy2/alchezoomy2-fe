import React from 'react'
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';
import fetch from 'superagent';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";


export const Teacher = async (props) => {
    const store = useStateStore();
    const [code] = React.useState();
    const [serverUrl] = React.useState();
    const [teacherInfo] = React.useState();

    try {
        const returnedObject = await fetch
            .post(serverUrl + '/teacher/oauth')
            .send({ code });

        store.changeTeacherInfo(returnedObject.body);
    }
    catch (e) {
        throw e;
    }

    return useObserver(() =>
        <Paper elevation={3} >
            <Link to='/'><Button >HOME</Button></Link>
            {teacherInfo.name}
        </Paper>

    )
}

export default Teacher;