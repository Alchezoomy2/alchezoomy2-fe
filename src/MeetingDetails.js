import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container } from '@material-ui/core';
import ChatBox from './ChatBox.js';



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

            await setMeetingObj(returnedObject.body.meeting);
            await setChatArray(returnedObject.body.chat)
            setLoading(false)
        }

        fetchMeetingDetails(meetingId.current)

    }, [store.serverUrl])

    console.log(loading)
    console.log(meetingObj)
    console.log(chatArray)

    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            {loading ?
                <p> LOADING!</p>
                :
                <div>
                    <ReactPlayer
                        ref={ref}
                        url={meetingObj.video_url}
                        controls
                    />
                    <ChatBox />
                </div>
            }
        </Container >
    )
}

export default MeetingDetails;