import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container } from '@material-ui/core';
import ChatBox from './ChatBox.js';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    let meetingId = useRef(props.match.params.id)
    const [videoTimestamp, setVideoTimestamp] = useState(0);
    let player = React.createRef();




    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            await fetch.get(store.serverUrl + `/student/view/${meetingId}`)
            store.changeMeetingDetails(returnedObject.body.meeting);
            store.changeChatArray(returnedObject.body.chat)
            store.changeLoading(false)
        }

        store.changeLoading(true)

        function videoProgression() {
            setInterval(() => {
                console.log(player.getCurrentTime())
            }, 500)
        }

        videoProgression();
        fetchMeetingDetails(meetingId.current)
    }, [store])

    return useObserver(() =>
        <Container
            maxWidth="xl"
            style={{ display: 'flex', justifyItems: 'center' }}>
            {store.loading ?
                <p> LOADING!</p>
                :
                <div>
                    <ReactPlayer
                        ref={player}
                        url={`${store.s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.mp4`}
                        controls
                    />
                    {store.meetingDetails.chat_url ?
                        <ChatBox />
                        :
                        <p></p>
                    }
                </div>
            }
        </Container >
    )
}

export default MeetingDetails;