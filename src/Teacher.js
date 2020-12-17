import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import { Container, List, Chip, ListItem, ListItemText, FormControlLabel, Switch, Divider } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { useObserver } from 'mobx-react';
import fetch from 'superagent';


export const Teacher = () => {
    let [loading, setLoading] = useState('true');
    const store = useStateStore();

    useEffect(() => {
        async function retrieveTeacherInfo() {
            const returnedObject = await fetch
                .post(store.serverUrl + '/teacher/oauth')
                .send({ code: store.code });

            await store.changeTeacherInfo(returnedObject.body);
        }

        async function retrieveMeetings() {
            let newMeetingObj;
            if (store.teacherInfo.new_user) {
                newMeetingObj = await fetch
                    .post(store.serverUrl + '/teacher/new')
                    .send({ teacher_info: store.teacherInfo });
            } else {
                newMeetingObj = await fetch
                    .post(store.serverUrl + '/teacher/meetings')
                    .send({ teacher_info: store.teacherInfo })
            }
            store.changeMeetingsObj(newMeetingObj.body);
            setLoading(false);
        }

        return retrieveTeacherInfo()
            .then(retrieveMeetings)
    }, [store]);

    const handlePublish = (async (meeting) => {
        let newMeetingObj;
        setLoading(true);
        if (meeting.published) {
            newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/unpublish')
                .send({ meetingId: meeting.id })
        } else {
            newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/publish')
                .send({ meetingId: meeting.id })
        }
        store.changeMeetingsObj(newMeetingObj.body);
        setLoading(false);
    })


    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>
                {loading ?
                    <p>LOADING!</p>
                    :
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

                                    <Chip variant="outlined" size="small" color="secondary" label={"views: " + meeting.meeting_views} />
                                    <Chip variant="outlined" size="small" color="secondary" label={"favorites " + meeting.meeting_favs} />
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

export default Teacher;