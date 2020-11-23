import React, { Component } from 'react'
import fetch from 'superagent';

export default class teacher extends Component {
    state = {
        loading: true,
        returnedObject: {}
    }

    componentDidMount = async () => {
        const URL = 'https://alchezoomy2.herokuapp.com/oauth';
        try {
            const returnedObject = await fetch.post(URL).send({ token: this.props.code });
            this.setState({
                returnedObject: returnedObject.body,
                loading: false
            })
        } catch (e) {
            throw e;
        }
    }
    render() {
        return (
            <div className='teacher'>

                {this.state.loading
                    ? <img src='/loading spinner.gif' alt='loading spinner' />
                    : <div>
                        <p>this.props.code</p>
                        <p>this.state.returnedObject</p>
                    </div>
                }
            </div>
        )
    }
}