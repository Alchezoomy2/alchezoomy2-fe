import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container } from '@material-ui/core';
import ChatBox from './ChatBox.js';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    const startingTimestamp = useRef(props.match.params.timestamp)
    let player = useRef();
    let videoTimestamp = useRef();


    useEffect(() => {
        async function startAtTimestamp() {
            console.log(startingTimestamp)
            await player.current.seekTo(startingTimestamp, 'seconds')
        }
        function videoProgression() {
            setInterval(() => {
                videoTimestamp.current = player.current.getCurrentTime();
            }, 500)
        }

        // videoProgression();
        startAtTimestamp();
    })

    const returnVideoTimestamp = () => {
        return videoTimestamp.current;
    }

    const handleChatSeek = (newTimestamp) => {
        player.current.seekTo(newTimestamp, 'seconds')
    }

    return useObserver(() =>
        <Container
            maxWidth="xl"
            style={{ display: 'flex', justifyItems: 'center' }}>
            <div>
                <ReactPlayer
                    ref={player}
                    url={`${store.s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.mp4`}
                    controls
                />
                {store.meetingDetails.chat_url ?
                    <ChatBox
                        returnVideoTimestamp={returnVideoTimestamp}
                        handleChatSeek={handleChatSeek}
                    />
                    :
                    <p></p>
                }
            </div>
        </Container >
    )
}

export default MeetingDetails;