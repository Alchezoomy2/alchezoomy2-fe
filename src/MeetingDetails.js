import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
// import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';



export const MeetingDetails = (props) => {
    let [loading] = useState(true)
    let [meetingId] = useRef(props.match.params.id)

    useEffect(() => {
        console.log('------------------------------------');
        console.log(`loading:  ${loading}`);
        console.log('------------------------------------');
        console.log('------------------------------------');
        console.log(`meetingId.current:  ${meetingId.current}`);
        console.log('------------------------------------');

    })


    return useObserver(() =>
        <p>FUCK YOU!</p>



    )
}

export default MeetingDetails;