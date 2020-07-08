import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase';

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
  signOut: {
    marginTop: theme.spacing(1)
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user, openAuth } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Lab Calculator
          </Typography>
          { user ? 
            <Button color="inherit" onClick={() => auth().signOut()}>Sign Out</Button> :
            <Button color="inherit" onClick={openAuth}>Sign In</Button> 
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}