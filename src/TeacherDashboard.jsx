import React from 'react'
import { useStateStore } from './StoreProvider'
import { publishMeeting, unpublishMeeting } from './utils/teacher-fetches/meeting-fetches.js'
import { Container, List, Divider } from '@material-ui/core';


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore()

    return (
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>
                {
                    store.meetingsObj.map(meeting =>
                        <div>
                            <TeacherMeetingItem meeting={meeting} />
                            <Divider variant="middle" component="li" />
                        </div>

                    )
                }
            </List>
        </Container >
    )
}
