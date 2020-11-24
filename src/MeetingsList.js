import React, { Component } from 'react'

export default class MeetingsList extends Component {

    handlePublish = async (meeting) {
        console.log(meeting)
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
