import React from 'react';
import { useStateStore } from './StoreProvider';


export const TeacherCreator = () => {
    const store = useStateStore()

    return (
        <p>HELLO!</p>
    )
}


