import { Container, Typography, List, Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';


export const Student = () => {
    let [loading, setLoading] = useState('true');
    const store = useStateStore();

    useEffect(() => {
        async function retrieveStudentInfo() {
            const returnedObject = await fetch
                .post(store.serverUrl + '/student/oauth')
                .send({ code: store.code });

            await store.changeStudentInfo(returnedObject.body);

        }

        async function retrieveMeetings() {
            let newMeetingObj;
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
            <List style={{ width: '90%' }}>

                {loading ?
                    <p>LOADING!</p>
                    :
                    store.meetingsObj.map(meeting =>
                        <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={meeting.user_name} src={meeting.pic_url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={meeting.topic}
                                    secondary={meeting.display_time}
                                />
                                <div>
                                    <div>
                                        <Chip size="small" color={meeting.video_url ? "primary" : ''} icon={<VideoLabelIcon />} label="video" />
                                        <Chip size="small" color={meeting.audio_url ? "primary" : ''} icon={<VolumeUpIcon />} label="audio" />
                                        <Chip size="small" color={meeting.chat_url ? "primary" : ''} icon={<ChatIcon />} label="chat" />
                                        <Chip size="small" color={meeting.transcript_url ? "primary" : ''} icon={<RecordVoiceOverIcon />} label="transcript" />
                                    </div>
                                    <div>
                                        {/* <Typography> */}
                                        <Chip size="large" color="secondary" label={meeting.meeting_views} />
                                        <Chip size="large" color="secondary" label={meeting.meeting_favs} />
                                        {/* Views: {meeting.meeting_views} */}
                                        {/* Favorites: {meeting.meeting_favs} */}
                                        {/* </Typography> */}
                                    </div>
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

export default Student;