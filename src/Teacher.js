import React, { Component } from 'react'
import fetch from 'superagent';

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

            this.props.handleSetState(userInfo);
            this.setState({
                loading: false
            })

            console.log('------------------------------------');
            console.log(`userInfo.access_token:  ${userInfo.access_token}`);
            console.log('------------------------------------');

            const returnedMeetingsObject = await fetch
                .post(serverURL + '/meetings/unpublished')
                .send({ access_token: this.props.appState.token })
            console.log('meetingInfo')
            console.log(returnedMeetingsObject);

        } catch (e) {
            throw e;
        }
    }
    render() {
        return (
            <div className='teacher'>
                <Link to='/'>HOME</Link>
                {this.state.loading
                    ? <p>loading:  {this.props.code}</p>
                    : <div>
                        <p>{this.props.appState.user_name}</p>
                        <img src={this.props.appState.pic_url} alt={this.props.appState.user_name} />
                    </div>
                }
            </div>
        )
    }
}