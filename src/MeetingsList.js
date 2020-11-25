import React, { Component } from 'react';
import fetch from 'superagent';


export default class MeetingsList extends Component {
    serverURL = 'https://alchezoomy2.herokuapp.com';

    handlePublish = async (meeting) => {
        console.log(meeting)
        const returnedMeetingObj = await fetch
            .post(`${this.serverURL}/publish/`)
            .send(meeting);

        console.log(returnedMeetingObj.body)
    }
    render() {
        return (
            <div>
                {this.props.meetingsArray.map(meeting => {
                    return <div>
                        <p>
                            <img src={meeting.pic_url} alt={meeting.user_name} />
                            {meeting.user_name}
                        </p>
                        <p> {meeting.start_time} </p>
                        <p> {meeting.topic} </p>
                        <button onClick={() => this.handlePublish(meeting)}>PUBLISH</button>
                    </div>
                })}
            </div>
        )
    }
}
