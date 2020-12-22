import { Container, List, Chip, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import { useObserver } from 'mobx-react';
import React, { useEffect } from 'react'
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { useHistory } from "react-router-dom";

export const Student = () => {
    const store = useStateStore();
    const history = useHistory();

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
            store.changeLoading(false);
        }

        return retrieveStudentInfo()
            .then(retrieveMeetings);
    }, [store]);

    const handleMeetingClick = (meetingId) => {
        store.changeLoading(true);
        history.push(`/meeting/${meetingId}`)
    }

    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>

                {store.loading ?
                    <p>LOADING!</p>
                    :
                    store.meetingsObj.map(meeting =>
                        <div>
                            <button onClick={() => handleMeetingClick(meeting.id)}>
                                <ListItem alignItems="flex-start" >
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

                                            <Chip variant="outlined" size="small" color="secondary" label={"views: " + meeting.meeting_views} />
                                            <Chip variant="outlined" size="small" color="secondary" label={"favorites " + meeting.meeting_favs} />
                                        </div>
                                    </div>
                                </ListItem>
                            </button>
                            <Divider variant="middle" component="li" />
                        </div>
                    )
                }
            </List>

        </Container >
    )
}

export default Student;
