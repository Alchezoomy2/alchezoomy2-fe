import React, { useEffect, useState } from 'react'
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import { Container, List, Chip, ListItem, ListItemText, FormControlLabel, Switch } from '@material-ui/core';
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
    list: {
        width: '90%',
        border: '1px solid blue'
    }
}));

export const Teacher = () => {
    let [loading, setLoading] = useState('true');
    const classes = useStyles();
    const store = useStateStore();



    useEffect(() => {
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
                store.changeMeetingsObj(newMeetingObj.body);
                setLoading(false);

            } else {
                const newMeetingObj = await fetch
                    .post(store.serverUrl + '/teacher/meetings')
                    .send({ teacher_info: store.teacherInfo })
                store.changeMeetingsObj(newMeetingObj.body);
                setLoading(false);
            }
        }

        return retrieveTeacherInfo()
            .then(retrieveMeetings)
    }, [store]);


    return useObserver(() =>
        <Container maxWidth="sm" className={classes.root}>
            <List >
                {loading ?
                    <p>LOADING!</p>
                    :
                    store.meetingsObj.map(meeting =>
                        <ListItem flexDirection="flex-start" >
                            <ListItemText
                                primary={meeting.start_time}
                                secondary={meeting.topic} />
                            <div>
                                <Chip size="small" color={meeting.video_url ? "primary" : ''} icon={<VideoLabelIcon />} label="video" />
                                <Chip size="small" color={meeting.audi_url ? "primary" : ''} icon={<VolumeUpIcon />} label="audio" />
                                <Chip size="small" color={meeting.chat_url ? "primary" : ''} icon={<ChatIcon />} label="chat" />
                                <Chip size="small" color={meeting.transcript_url ? "primary" : ''} icon={<RecordVoiceOverIcon />} label="transcript" />
                            </div>
                            <FormControlLabel
                                control={<Switch checked={meeting.publish}
                                    // onChange={() => handlePublish(meeting.id)}
                                    name='publish'
                                    color="primary"
                                />}
                                label="publish" />
                        </ListItem>
                    )
                }


            </List>



        </Container>

    )
}

export default Teacher;