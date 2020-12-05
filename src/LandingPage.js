import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import request from 'superagent'

export default class LandingPage extends Component {

    handleButtonPress = async (buttonPressed) => {
        this.props.handleSetState({ "user_type": buttonPressed });
        window.location.href = "https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://alchezoomy2.netlify.app/redirect";
    }


    render() {
        return (
            <div className='landing'>
                <h1 className='landing-tagline'>Never miss a beat.</h1>
                <h2 className='landing-description'>Search uploaded Zoom videos and chat logs for easy reference.</h2>

                <button onClick={() => this.handleButtonPress('teacher')} className='teacher-button'>Teacher Login</button>
                <button onClick={() => this.handleButtonPress('student')} className='teacher-button'>Student Login</button>

                {/* <div className='box'>
                    <form onSubmit={this.handleSubmit}>
                        <h2 className='student-login'>Student Login</h2>
                        <p className='email'>E-mail:</p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email}></input>
                        <p className='password'>Password:</p>
                        <input onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} type="password" />
                        <br /><button className='login-button'>Submit</button>
                        <br />
                        <p className='sign-up'>Not a user? <Link to='/signup' className='link'>Sign up here</Link>.</p> */}

            </div >
        )
    }
}

