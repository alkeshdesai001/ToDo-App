import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const PlayerList = (props) => {
  const { anchor, showDrawer, setShowDrawer } = props;

  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor='left'
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      onOpen={() => setShowDrawer(true)}
    >
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role='presentation'
        onClick={() => setShowDrawer(false)}
        onKeyDown={() => setShowDrawer(false)}
      >
        <Typography variant='h6' color='inherit' align='center'>
          ToDo App
        </Typography>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText
              primary='Home'
              style={{ textTransform: 'capitalize' }}
            />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default PlayerList;
