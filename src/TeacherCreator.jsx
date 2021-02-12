import React from 'react';
import { useStateStore } from './StoreProvider';


export const TeacherCreator = () => {
    const store = useStateStore()

    return (
        <Container>
            <p>HI!</p>
        </Container>
    )
}


