import React, { Component } from 'react'
import fetch from 'superagent';

export default class teacher extends Component {
    state = {
        loading: true,
    }

    componentDidMount = async () => {
        const URL = 'https://alchezoomy2.herokuapp.com/oauth';
        try {
            const returnedObject = await fetch
                .post(URL)
                .send({ token: this.props.code });

            const userInfo = returnedObject.body;

            this.props.handleSetState(userInfo);
            this.setState({
                loading: false
            })

            // this.props.handleSetState({ token: this.returnedToken.body });

        } catch (e) {
            throw e;
        }
    }
    render() {
        return (
            <div className='teacher'>

                {this.state.loading
                    ? <p>loading:  {this.props.code}</p>
                    : <div>
                        <p>{this.props.code}</p>
                        <p>{this.props.appState.appState}</p>
                    </div>
                }
            </div>
        )
    }
}