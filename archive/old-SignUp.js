import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent';
export default class SignUp extends Component {
    state = {
        email: '',
        password: '',

    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://alchezoomy.herokuapp.com/auth/signup')
            .send(this.state);

        this.props.changeTokenAndUsername(user.body.email, user.body.token);

        this.props.history.push('/student');

    }
    render() {
        return (
            <div className='sign-up-page'>
                <div className='box'>
                <h2 className='student-signup'>Student Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p className='email'>E-mail:</p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email}></input>
                        <p className='password'>Password:</p>
                        <input onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} type="password"></input>
                        <br />
                        <button className='signup-button'>Submit</button>
                        <br />
                        <p className='sign-up'>Already a user? <Link to='/' className='link'>Log in here</Link>.</p>
                    </form>
                </div>
            </div>
        )
    }
}
