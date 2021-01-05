import React, { Component } from 'react'

// import PrivateRoute from './PrivateRoute.js';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import './App.css';
import './temp.css';
import Header from '../src/Header.js'
import LandingPage from '../src/LandingPage.js'
import Student from '../src/Student.js'
// import Bookmarks from './Bookmarks.js'
// import Favorites from './Favorites.js'
// import VideoDetails from './VideoDetails.js'
// import SignUp from './SignUp.js'
// import AboutUs from './AboutUs.js'
import Footer from './Footer';
import Teacher from '../src/Teacher.js';
import Redirect from '../src/Redirect.js';



export default class App extends Component {
  state = {
    code: '',
    user_type: ''
  }

  handleSetState = (stateObject) => {
    this.setState(stateObject);
  }

  render() {
    return (
      <div>
        <Header />

        <Router>
          <Switch>
            <Route exact path='/'
              render={(routerProps) =>
                <div>

                  <LandingPage

                    {...routerProps}
                    handleSetState={this.handleSetState}
                  /></div>
              }

            />

            <Route

              token={this.state.token}
              exact path='/student'
              render={(routerProps) =>
                <Student
                  {...routerProps}
                  code={this.state.code}
                  appState={this.state}
                  handleSetState={this.handleSetState}
                />
              }
            />

            <Route exact path='/teacher'
              render={(routerProps) =>
                <Teacher

                  {...routerProps}
                  code={this.state.code}
                  appState={this.state}
                  handleSetState={this.handleSetState}
                />
              }
            />

            <Route exact path='/redirect'
              render={(routerProps) =>
                <Redirect
                  {...routerProps}
                  handleSetState={this.handleSetState}
                  user_type={this.state.user_type}
                />
              }
            />


            {/* <PrivateRoute
              token={this.state.token}

              exact path='/favorites'
              render={(routerProps) =>
                <Favorites
                  {...routerProps}
                  token={this.state.token}
                />
              }
            /> */}

            {/* <PrivateRoute
              token={this.state.token}

              exact path='/bookmarks'
              render={(routerProps) =>
                <Bookmarks
                  {...routerProps}
                  token={this.state.token}
                />
              }
            /> */}
            {/* 
            <PrivateRoute
              token={this.state.token}

              exact path='/meeting/:id'
              render={(routerProps) =>
                <VideoDetails

                  {...routerProps}
                  token={this.state.token}
                  favorites={this.state.favorites}
                />
              }

            /> */}

            {/* <Route exact path='/signup'
              render={(routerProps) =>
                <SignUp

                  {...routerProps}
                  token={this.state.token}
                  changeTokenAndUsername={this.changeTokenAndUsername}
                />
              }
            /> */}
            {/* 
            <Route exact path='/aboutus'
              render={(routerProps) =>
                <AboutUs {...routerProps}
                />
              }
            /> */}
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

