import React, { Component } from 'react'

export default class Redirect extends Component {

    componentDidMount = async () => {
        let code = new URLSearchParams(window.location.search);

        this.props.handleSetState({ code: code.get('code') });
        alert(this.props.user_type)
        if (this.props.user_type === 'teacher') {
            this.props.history.push('/teacher');
        } else {
            this.props.history.push('/student');
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
