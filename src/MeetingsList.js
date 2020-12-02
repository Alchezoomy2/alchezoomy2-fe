import React, { Component } from 'react';
import fetch from 'superagent';


export default class MeetingsList extends Component {
    serverURL = 'https://alchezoomy2.herokuapp.com';

    handlePublish = async (meeting) => {

        console.log(meeting.id);

        const returnedMeetingArray = await fetch
            .post(`${this.serverURL}/publish/`)
            .send({ meetingId: meeting.id });

        this.props.handleUpdateMeetingsArray(returnedMeetingArray)
    }
    render() {
        return (
            <div className='meeting-list'>
                {this.props.meetingsArray.map(meeting => {
                    return <div className='meeting-item'>
                        <div>
                            <img src={meeting.pic_url} alt={meeting.user_name} className='meeting-item-image' />
                            {meeting.user_name}
                        </div>
                        <div> {meeting.start_time}
                            <br /> {meeting.topic} </div>
                        <button onClick={() => this.handlePublish(meeting)}>PUBLISH</button>
                    </div>
                })}
            </div>
        )
    }
}
