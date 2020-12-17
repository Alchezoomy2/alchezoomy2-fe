import React, { useState } from "react";
// import ReactPlater from "react-player";
import { useObserver } from 'mobx-react';
// import { useStateStore } from './StoreProvider.js'
// import fetch from 'superagent';



export const MeetingDetails = () => {
    let [loading] = useState('true')


    return useObserver(() =>
        <p>{loading}</p>



    )
}

export default MeetingDetails;