import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';



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


    return useObserver(() =>
        <p>{meetingObj.current}</p>
    )
}

export default MeetingDetails;