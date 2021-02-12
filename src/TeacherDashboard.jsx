import React from 'react'
import { useStateStore } from './StoreProvider'

import { publishMeeting, unpublishMeeting } from './utils/teacher-fetches/meeting-fetches.js'
import { Container, List, Chip, ListItem, ListItemText, FormControlLabel, Switch, Divider } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore()


    const handlePublish = (async (meeting) => {
        let newMeetingObj;
        setOpen(true);

        if (meeting.published) {
            newMeetingObj = await unpublishMeeting(meeting.id)

        } else {
            newMeetingObj = await publishMeeting(meeting.id)

        }

        store.changeMeetingsObj(newMeetingObj);
        setOpen(false);
    })


    return (
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>
                {
                    store.meetingsObj.map(meeting =>
                        <div>
                            <ListItem alignItems="flex-start" >
                                <ListItemText
                                    primary={meeting.topic}
                                    secondary={meeting.display_time}
                                />
                                <div>
                                    <Chip size="small" color={meeting.video_url ? "primary" : ''} icon={<VideoLabelIcon />} label="video" />
                                    <Chip size="small" color={meeting.audio_url ? "primary" : ''} icon={<VolumeUpIcon />} label="audio" />
                                    <Chip size="small" color={meeting.chat_url ? "primary" : ''} icon={<ChatIcon />} label="chat" />
                                    <Chip size="small" color={meeting.transcript_url ? "primary" : ''} icon={<RecordVoiceOverIcon />} label="transcript" />
                                </div>
                                <FormControlLabel
                                    control={<Switch checked={meeting.published}
                                        onChange={() => handlePublish(meeting)}
                                        name='publish'
                                        color="primary"
                                    />}
                                    label="publish" />
                                <div>
                                    <Chip size="small" color="secondary" label={"views: " + meeting.meeting_views} />
                                    <Chip size="small" color="secondary" label={"favorites " + meeting.meeting_favs} />
                                </div>
                            </ListItem>

                            <Divider variant="middle" component="li" />
                        </div>

                    )
                }
            </List>
        </Container >
    )
}
