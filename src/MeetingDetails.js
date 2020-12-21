import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container } from '@material-ui/core';
import ChatBox from './ChatBox.js';



export const MeetingDetails = async (props) => {
    const store = useStateStore();
    let meetingId = useRef(props.match.params.id)
    let ref = React.createRef();
    await store.changeLoading(true)

    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            store.changeMeetingDetails(returnedObject.body.meeting);
            store.changeChatArray(returnedObject.body.chat)
            store.changeLoading(false)
            console.log('fetchMeetingDetails')

        }

        fetchMeetingDetails(meetingId.current)
        console.log('useEffect')
    }, [store])

    // console.log(loading)
    // console.log(meetingObj)
    // console.log(chatArray)

    return useObserver(() =>
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            {store.loading ?
                <p> LOADING!</p>
                :
                <div>
                    <ReactPlayer
                        ref={ref}
                        url={store.meetingDetails.video_url}
                        controls
                    />
                    <ChatBox />
                </div>
            }
        </Container >
    )
}

export default MeetingDetails;