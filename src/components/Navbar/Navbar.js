import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  badge: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => setShowDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.title}>
              ToDo App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        anchor='left'
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </>
  );
};

export default Navbar;
