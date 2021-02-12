import React from 'react';
import { useStateStore } from './StoreProvider';
import { Container } from '@material-ui/core';


export const TeacherCreator = () => {
    const store = useStateStore()

    return (
        <Container>
            <p>HI!</p>
        </Container>
    )
}


