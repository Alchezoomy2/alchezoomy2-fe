import React, { useEffect } from 'react'
import { useStateStore } from './StoreProvider.js'
import { Paper, Button, Typography } from '@material-ui/core';
import fetch from 'superagent';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";


export const Teacher = () => {
    const store = useStateStore();

    async function retrieveTeacherInfo() {
        const returnedObject = await fetch
            .post(store.serverUrl + '/teacher/oauth')
            .send({ code: store.code });

        store.changeTeacherInfo(returnedObject.body);
        console.log(store.teacherInfo)
    }

    async function retrieveTeacher() {

        if (store.teacherInfo.new_user) {
            store.changeMeetingsObj(await fetch
                .post(store.serverUrl + '/teacher/new')
                .send({ teacher_info: store.teacherInfo }));
        } else {
            store.changeMeetingsObj(await fetch
                .post(store.serverUrl + '/teacher/meetings')
                .send({ teacher_info: store.teacherInfo }));
        }
    }

    useEffect(() => {
        return retrieveTeacherInfo()
            .then(retrieveTeacher)
        // .then(store.changeLoading(false))
    });

    return useObserver(() =>
        <Paper elevation={3} >
            {store.loading ?
                <Link to='/'><Button >HOME</Button></Link>
                :
                <Typography>
                    {store.teacherInfo.name}
                </Typography>
            }
        </Paper>

    )
}

export default Teacher;