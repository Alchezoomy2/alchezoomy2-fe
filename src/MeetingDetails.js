import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';

const findMeetingObj = (meetingId, meetingsObj) => {
    for (let meeting of meetingsObj) {
        if (meeting.id === meetingId) return meeting;
    }
}


export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [loading] = useState(true)
    let meetingId = useRef(props.match.params.id)
    let meetingObj = findMeetingObj(meetingId, store.meetingsObj)


    console.log('------------------------------------');
    console.log(`meetingObj:  ${meetingObj}`);
    console.log('------------------------------------');
    useEffect(() => {

    })


    return useObserver(() =>
        <p>FUCK YOU!</p>



    )
}

export default MeetingDetails;