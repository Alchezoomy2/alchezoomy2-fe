import React, { useState } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
// import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';




export const MeetingDetails = () => {
    const [loading] = useState(true)
    return useObserver(() => {
        loading ?
            <p> FUCK YOU!@!!!!!!</p>
            :
            <p> FUCCCCKKKKKK!</p>
    }

    )
}

export default MeetingDetails;