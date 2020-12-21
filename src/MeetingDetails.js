import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container } from '@material-ui/core';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [loading, setLoading] = useState(true)
    let meetingId = useRef(props.match.params.id)
    let meetingObj = useRef();
    let chatArray = useRef();
    let transcriptArray = useRef();

    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            meetingObj.current = returnedObject.body.meetingObj;
            chatArray.current = returnedObject.body.chat;
            transcriptArray.current = returnedObject.body.meetingObj;
        }

        fetchMeetingDetails(meetingId.current)
            .then(setLoading(false))
    }, [store])

    const ref = (player) => {
        this.player = player;
    };

    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <p>{loading}</p>
            <ReactPlayer
                ref={this.ref}
                url={meetingObj.video_url}
                controls
            />
        </Container>
    )
}

export default MeetingDetails;