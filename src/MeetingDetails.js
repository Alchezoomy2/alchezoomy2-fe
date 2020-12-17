import React, { useEffect, useState, useRef } from "react";
// import ReactPlater from "react-player";
import { useObserver, toJS } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [loading, setLoading] = useState(true)
    let meetingId = useRef(props.match.params.id)
    // let chatArray = useRef();
    // let transcriptArray = useRef();
    console.log(toJS(store.meetingsObj))
    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            console.log(returnedObject.body)

        }

        fetchMeetingDetails(meetingId.current)
            .then(setLoading(false))
    }, [store])


    return useObserver(() =>
        <p>{loading}</p>
    )
}

export default MeetingDetails;