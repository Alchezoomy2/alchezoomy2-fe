import { Container, Typography } from '@material-ui/core';
import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';

export const Student = () => {
    let [loading, setLoading] = useState('true');
    const store = useStateStore();
    console.log(store.code)
    useEffect(() => {
        console.log('inside useEffect')
        async function retrieveStudentInfo() {
            const returnedObject = await fetch
                .post(store.serverUrl + '/student/oauth')
                .send({ code: store.code });


            await store.changeStudentInfo(returnedObject.body);
            setLoading(false);
        }

        async function retrieveMeetings() {
            let newMeetingObj;
            setLoading(true);
            if (store.studentInfo.new_user) {
                newMeetingObj = await fetch
                    .post(store.serverUrl + '/student/new')
                    .send({ student_info: store.studentInfo })
            } else {
                newMeetingObj = await fetch
                    .post(store.serverUrl + '/student/meetings')
                    .send({ student_info: store.studentInfo })
            }
            store.changeMeetingsObj(newMeetingObj.body);
            setLoading(false)
        }

        return retrieveStudentInfo()
            .then(retrieveMeetings);
    }, [store]);

    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            {loading ?
                <p>LOADING!</p>
                :
                <Typography>{store.studentInfo.name}</Typography>
            }
        </Container>
    )
}

export default Student;