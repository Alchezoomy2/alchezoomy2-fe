import React, { Component } from 'react'
import MeetingsList from './MeetingsList.js';
import fetch from 'superagent';
import { Link } from "react-router-dom";

export default class teacher extends Component {
    state = {
        loading: true,
    }

    componentDidMount = async () => {
        const serverURL = 'https://alchezoomy2.herokuapp.com';
        try {
            const returnedObject = await fetch
                .post(serverURL + '/oauth')
                .send({ code: this.props.code });

            const userInfo = returnedObject.body;

            await this.props.handleSetState(userInfo);

            const returnedMeetingsObject = await fetch
                .post(serverURL + '/meetings/unpublished')
                .send({ user_info: userInfo });


            this.setState({
                loading: false,
                meetingsArray: returnedMeetingsObject.body
            })
            console.log('meetingInfo')
            console.log(returnedMeetingsObject.body);

        } catch (e) {
            throw e;
        }
    }
    render() {
        return (
            <div className='teacher'>
                <Link to='/'>HOME</Link>
                {this.state.loading
                    ? <p>loading...</p>
                    : <div className='teacher-main'>
                        <p>{this.props.appState.user_name}</p>
                        <img src={this.props.appState.pic_url} alt={this.props.appState.user_name} />

                        <MeetingsList
                            meetingsArray={this.state.meetingsArray}
                        />
                    </div>
                }
            </div>
        )
    }
}