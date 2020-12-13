import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, Chip, ListItem, ListItemText, FormControlLabel, Switch } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import ChatIcon from '@material-ui/icons/Chat';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import fetch from 'superagent';
import { useObserver } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export const Teacher = () => {
    let [loading] = useState('true');
    const classes = useStyles();
    const store = useStateStore();


    async function retrieveTeacherInfo() {
        console.log()
        const returnedObject = await fetch
            .post(store.serverUrl + '/teacher/oauth')
            .send({ code: store.code });

        await store.changeTeacherInfo(returnedObject.body);
    }

    async function retrieveMeetings() {

        if (store.teacherInfo.new_user) {
            const newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/new')
                .send({ teacher_info: store.teacherInfo });
            console.log(newMeetingObj.body)
            store.changeMeetingsObj(newMeetingObj.body);
            loading = false;

        } else {
            const newMeetingObj = await fetch
                .post(store.serverUrl + '/teacher/meetings')
                .send({ teacher_info: store.teacherInfo })
            console.log(newMeetingObj.body)
            store.changeMeetingsObj(newMeetingObj.body);
            loading = false;
        }
    }
    useEffect(() => {
        return retrieveTeacherInfo()
            .then(retrieveMeetings);
    }, [])

    return useObserver(() =>
        <Paper elevation={3} >
            <List className={classes.root}>
                {store.meetingsObj &&
                    store.meetingsObj.map(meeting =>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={meeting.start_time}
                                secondary={meeting.topic} />
                        if (meeting.video_url) <Chip size="small" color="primary" icon={<VideoLabelIcon />} label="video" />
                        if (meeting.audio_url) <Chip size="small" color="primary" icon={<VolumeUpIcon />} label="audio" />
                        if (meeting.chat_url) <Chip size="small" color="primary" icon={<ChatIcon />} label="chat" />
                        if (meeting.transcript_url) <Chip size="small" color="primary" icon={<RecordVoiceOverIcon />} label="transcript" />

                            <FormControlLabel
                                control={<Switch checked={meeting.publish}
                                    // onChange={() => handlePublish(meeting.id)}
                                    name='publish' />}
                                label="publish" />
                        </ListItem>
                    )
                }


            </List>



        </Paper>

    )
}

export default Teacher;