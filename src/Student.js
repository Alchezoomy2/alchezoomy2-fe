import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';
// import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';
import { useHistory } from "react-router-dom";
import StudentMeetings from "./StudentMeetings.js"
import StudentHeader from "./StudentHeader.js"



export const Student = () => {
    // const store = useStateStore();
    // const history = useHistory();


    return useObserver(() =>
        <Grid>
            <StudentHeader />
            {/* <StudentMeetings /> */}
        </Grid>

    )
}

export default Student;