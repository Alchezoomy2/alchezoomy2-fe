import React, { Component } from "react";
import MeetingsList from "./MeetingsList.js";
import fetch from "superagent";
import { Link } from "react-router-dom";

export default class teacher extends Component {
    state = {
        meetingsArray: [],
        loading: true,
    };

    componentDidMount = async () => {
        const serverURL = "https://alchezoomy2.herokuapp.com";
        try {
            const returnedObject = await fetch
                .post(serverURL + "/teacher/oauth")
                .send({ code: this.props.code });

            let teacherInfo = returnedObject.body;

            await this.props.handleSetState(teacherInfo);

            let returnedMeetingsObject;

            if (teacherInfo.new_user) {
                returnedMeetingsObject = await fetch
                    .post(serverURL + "/teacher/new")
                    .send({ teacher_info: teacherInfo });
            } else {

                returnedMeetingsObject = await fetch
                    .post(serverURL + "/teacher/meetings")
                    .send({ teacher_info: teacherInfo });
            }

            this.setState({
                loading: false,
                meetingsArray: returnedMeetingsObject.body
            });


        } catch (e) {
            throw e;
        }
    };

    handleUpdateMeetingsArray = (meetingsArray) => {
        this.setState({ meetingsArray });
    };
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
                            handleUpdateMeetingsArray={this.handleUpdateMeetingsArray}
                        />
                    </div>
                }
            </div>
        );
    }
}