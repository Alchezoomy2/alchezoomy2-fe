import React from "react";
import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';


const findMeetingObj = (meetingId) {
    for (let meeting in store.meetingsObj) {
        if (meeting.id === meetingId) return meeting;
    }
}


export const MeetingDetails = (props) => {
    const store = useStateStore();
    let [chatArray] = useStateStore();
    let [transcriptArray] = useStateStore();
    let [loading, setLoading] = useStateStore(true);
    let meetingId = new URLSearchParams(props.location.search);
    let meetingObj = findMeetingObj(meetingId);


    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObj = await fetch
                .get(store.serverUrl + `/teacher/meetings/${meetingId}`)

            chatArray = returnedObj.body.chat;
            transcriptArray = returnedObj.body.transcript;
            setLoading(false);
        }

        if (meetingObj.chat_url || meetingObj.transcriptArray)
            fetchMeetingDetails(meetingId);

    }, [store])

    console.log(chatArray)
    return useObserver(() =>

        <p>VIDEO DETAILS!</p>



    )

}

export default MeetingDetails;