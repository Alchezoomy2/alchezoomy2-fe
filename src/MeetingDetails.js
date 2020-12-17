import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [loading, setLoading] = useState(true)
    let meetingId = useRef(props.match.params.id)
    // let chatArray = useRef();
    // let transcriptArray = useRef();


    useEffect(() => {
        console.log(meetingId.current)
        console.log(store.meetingsObj)
        console.log(store.userType)
        setLoading(false)
    })


    return useObserver(() =>
        <p>{loading}</p>
    )
}

export default MeetingDetails;