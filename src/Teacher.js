import React, { useEffect } from 'react'
import { useStateStore } from './StoreProvider.js'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List } from '@material-ui/core';
// import VolumeUpIcon from '@material-ui/icons/VolumeUp';
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
    const classes = useStyles();
    const store = useStateStore();

    async function retrieveTeacherInfo() {
        const returnedObject = await fetch
            .post(store.serverUrl + '/teacher/oauth')
            .send({ code: store.code });

        await store.changeTeacherInfo(returnedObject.body);
    }

    async function retrieveTeacher() {

        if (store.teacherInfo.new_user) {
            store.changeMeetingsObj(await fetch
                .post(store.serverUrl + '/teacher/new')
                .send({ teacher_info: store.teacherInfo }));
        } else {
            store.changeMeetingsObj(await fetch
                .post(store.serverUrl + '/teacher/meetings')
                .send({ teacher_info: store.teacherInfo }));
        }
    }

    useEffect(() => {
        return retrieveTeacherInfo()
            .then(retrieveTeacher)
    });
    console.log(typeof store.meetingsObj)


    return useObserver(() =>
        <Paper elevation={3} >
            <List className={classes.root}>
                {/* {store.meetingsObj.map(meeting =>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={meeting.start_time}
                            secondary={meeting.topic} />
                        if (meeting.audio_url) <Chip size="small" icon={<VolumeUpIcon />} label="audio" />
                    </ListItem>

                )} */}

            </List>



        </Paper>

    )
}

export default Teacher;