import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
// import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';



export const MeetingDetails = (props) => {
    let [loading] = useState(true)
    let [meetingId] = useRef();

    useEffect(() => {
        meetingId.current = new URLSearchParams(props.location.id)
        console.log('------------------------------------');
        console.log(`meetingId:  ${meetingId}`);
        console.log('------------------------------------');
    })



    return useObserver(() =>
        <p>{loading}</p>



    )
}

export default MeetingDetails;