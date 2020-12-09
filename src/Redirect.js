import React, { Component } from 'react'

export default class Redirect extends Component {

    componentDidMount = async () => {
        let code = new URLSearchParams(window.location.search);

        await this.props.handleSetState({ code: code.get('code') });
        await alert(this.props.user_type)
        if (this.props.user_type === 'teacher') {
            await this.props.history.push('/teacher');
        } else {
            await this.props.history.push('/student');
        }
    }
    render() {
        return (
            <div>
                redirecting...
            </div>
        )
    }
}
