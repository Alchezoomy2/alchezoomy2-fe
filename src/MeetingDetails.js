import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';

const findMeetingObj = (meetingId, meetingsObj) => {
    for (let meeting of meetingsObj) {
        console.log(meeting)
        if (meeting.id === meetingId) return meeting;
    }
}


export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [loading] = useState(true)
    let meetingId = useRef(props.match.params.id)
    // let chatArray = useRef();
    // let transcriptArray = useRef();


    useEffect(() => {

        // async function fetchMeetingDetails(meetingId) {
        //     const returnedObject = await fetch
        //         .get(store.serverUrl + `/teacher/meetings/${meetingId.current}`)

        //     chatArray.current = await returnedObject.body.chat;

        //     transcriptArray.current = await returnedObject.body.transcript;

        //     setLoading(false);

        //     console.log('------------------------------------');
        //     console.log(`chatArray[0]:  ${chatArray[0]}`);
        //     console.log('------------------------------------');

        //     console.log('------------------------------------');
        //     console.log(`loading:  ${loading}`);
        //     console.log('------------------------------------');
        // }

        const meetingsObj = store.meetingsObj;
        console.log(meetingsObj)

        let meetingObj = findMeetingObj(meetingId, meetingsObj)


        console.log('------------------------------------');
        console.log(`meetingObj:  ${meetingObj}`);
        console.log('------------------------------------');


        // if (meetingObj.chat_url || meetingObj.transcript_url) fetchMeetingDetails(meetingId);
    })


    return useObserver(() => {
        loading ?
            <p>FUCK YOU!</p>
            :
            <p> {store.meetingsObj}</p>
    }



    )
}

export default MeetingDetails;