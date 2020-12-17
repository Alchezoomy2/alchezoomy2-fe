import React, { useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
// import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';



export const MeetingDetails = (props) => {
    let [loading] = useState(true)
    let [meetingId] = useRef(new URLSearchParams(props.location.id));

    console.log('------------------------------------');
    console.log(`meetingId:  ${meetingId.current}`);
    console.log('------------------------------------');

    return useObserver(() =>
        <p>{loading}</p>



    )
}

export default MeetingDetails;