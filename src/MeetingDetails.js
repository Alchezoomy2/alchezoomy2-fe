import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';




export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [chatArray] = useRef();
    let [transcriptArray] = useRef();
    let [meetingId] = useRef()
    let [loading, setLoading] = useState(true);

    const findMeetingObj = (meetingId) => {
        console.log('------------------------------------');
        console.log(`meetingId:  ${meetingId}`);
        console.log('------------------------------------');
        console.log(store.meetingsObj)
        for (let meeting in store.meetingsObj) {
            if (meeting.id === meetingId) return meeting;
        }
    }

    meetingId.current = new URLSearchParams(props.location.id);

    console.log('------------------------------------');
    console.log(`meetingId:  ${meetingId}`);
    console.log('------------------------------------');
    let meetingObj = findMeetingObj(meetingId);


    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObj = await fetch
                .get(store.serverUrl + `/teacher/meetings/${meetingId}`)

            chatArray.current = returnedObj.body.chat;
            transcriptArray.current = returnedObj.body.transcript;
            setLoading(false);
        }

        if (meetingObj.chat_url || meetingObj.transcriptArray)
            fetchMeetingDetails(meetingId);

    }, [chatArray, transcriptArray, meetingId, meetingObj.chat_url, meetingObj.transcriptArray, store.serverUrl])

    console.log(chatArray)
    return useObserver(() => {
        loading ?
            <p>LOADING!</p>
            :
            <p>VIDEO DETAILS!</p>
    }


    )

}

export default MeetingDetails;