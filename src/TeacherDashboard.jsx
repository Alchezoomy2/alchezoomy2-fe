import React from 'react'
import { useStateStore } from './StoreProvider'
import { Container, List, Divider } from '@material-ui/core';
import { TeacherMeetingItem } from './TeacherMeetingItem'


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore()

    return (
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>
                {
                    store.meetingsObj.map(meeting =>
                        <div>
                            <TeacherMeetingItem meeting={meeting} setOpen={setOpen} />
                            <Divider variant="middle" component="li" />
                        </div>

                    )
                }
            </List>
        </Container >
    )
}
