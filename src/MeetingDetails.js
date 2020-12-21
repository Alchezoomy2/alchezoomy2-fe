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
    let [meetingObj, setMeetingObj] = useState();
    let [chatArray, setChatArray] = useState();
    // let transcriptArray = useRef();
    let ref = React.createRef();

    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            setMeetingObj(returnedObject.body.meeting);
            setChatArray(returnedObject.body.chat)
            // chatArray.current = returnedObject.body.chat;
            // transcriptArray.current = returnedObject.body.meetingObj;

        }

        fetchMeetingDetails(meetingId.current)
            .then(setLoading(false))

    }, [store.serverUrl])




    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            {loading ?
                <p> LOADING!</p>
                :
                <div>
                    <ReactPlayer
                        ref={ref}
                        // url={meetingObj.video_url}
                        controls
                    />

                </div>
            }
        </Container >
    )
}

export default MeetingDetails;