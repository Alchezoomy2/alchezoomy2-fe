import { Container, Typography } from '@material-ui/core';
import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'


export const Student = () => {
    let [loading, setLoading] = useState('true');
    const store = useStateStore();

    useEffect(() => {
        async function retrieveStudentInfo() {
            const returnedObject = await fetch
                .post(store.serverUrl + '/student/oauth')
                .send({ code: store.code });


            await store.changeStudentInfo(returnedObject.body);
            setLoading(false);
        }

        return retrieveStudentInfo();
    });

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