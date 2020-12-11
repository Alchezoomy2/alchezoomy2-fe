import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { useStateStore } from './StoreProvider.js'
import { useObserver } from 'mobx-react';
import classes from '*.module.css';



export const Header = () => {
    const store = useStateStore();

    return useObserver(() =>
        <AppBar position="static" >
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    coloe="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

}

export default Header;