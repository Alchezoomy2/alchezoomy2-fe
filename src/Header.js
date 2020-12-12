import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
// import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
// import classes from '*.module.css';



export const Header = () => {
    // const store = useStateStore();

    return useObserver(() =>
        <AppBar position="static" >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6" >
                    Alchezoomy
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;