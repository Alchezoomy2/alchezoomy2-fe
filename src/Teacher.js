import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import { AppBar, Typography, Grid, Container, List, Chip, ListItem, ListItemText, FormControlLabel, Switch, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { useObserver } from 'mobx-react';
import fetch from 'superagent';


export const Teacher = () => {
    // let [loading, setLoading] = useState('true');
    let [open, setOpen] = useState(false);
    const store = useStateStore();

    const handlePublish = (async (meeting) => {
        let newMeetingObj;
        setOpen(true);

        if (meeting.published) {
            newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/unpublish')
                .send({ meetingId: meeting.id })
        } else {
            newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/publish')
                .send({
                    meetingId: meeting.id,
                    access_token: store.teacherInfo.access_token
                })
        }
        store.changeMeetingsObj(newMeetingObj.body);
        setOpen(false);
    })

    return useObserver(() =>
        <div>
            <Grid>
                <AppBar position="static" style={{ width: '100%' }}>
                    <Typography
                        variant="h6" >
                        Alchezoomy
                </Typography>
                </AppBar>
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
                <Backdrop open={open}>
                    <CircularProgress />
                </Backdrop>
            </Grid>
        </div>

    )
}

export default Teacher;