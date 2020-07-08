import React, { useState, useContext } from 'react';
import { Avatar, DialogContent, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { auth } from '../../firebase';
import { LoadingContext } from '../../contexts/LoadingContext';
import ForgotPassword from './ForgotPassword';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props: any) {
  const classes = useStyles();

  const { displayFeedback } = useContext(LoadingContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);

  const handleCloseForgot = (event: any, reason: string) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpenForgot(false);
  }

  // Attempt login
  const handleSubmit = (event: any, email: string, password: string, remember: boolean) => {
    event.preventDefault();
    displayFeedback("loading", "Signing in...");
    if (remember) {
      auth().setPersistence(auth.Auth.Persistence.LOCAL)
      .catch((error) => {
        console.error("Error could not remember user", error);
      });
    } else {
      auth().setPersistence(auth.Auth.Persistence.SESSION)
      .catch((error) => {
        console.error("Error temp remember", error);
      });
    }
    auth().signInWithEmailAndPassword(email, password)
    .then(() => displayFeedback("success", "Welcome back!"))
    .catch(error => {
      const code = error.code;
      if (code === "auth/user-not-found") {
        displayFeedback("error", "Invalid login credentials")
      } else if (code === "auth/too-many-requests") {
        displayFeedback("error", "Too many attempts to login. Please try again later")
      } else {
        displayFeedback("error", "Sign in attempt failed")
      }
      console.error("Error signing in with password and email", error);
    });
  }

  // Update input values
  const onChangeHandler = (event: any) => {
    const { name, value, checked } = event.currentTarget;
    if (name === "email") { // Update email value
      setEmail(value);
    } else if (name === "password") { // Update password value
      setPassword(value);
    } else if (name === "remember") {
      setRemember(checked);
    }
  }

  return (
    <DialogContent className={classes.paper}>
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign In</Typography>
      <form className={classes.form} onSubmit={(event) => handleSubmit(event, email, password, remember)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          onChange={(event) => onChangeHandler(event)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => onChangeHandler(event)}
        />
        <FormControlLabel
          control={<Checkbox 
            color="primary" 
            name="remember"
            onChange={(event) => onChangeHandler(event)}
          />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
      <Grid container>
        <Grid item xs={6}>
          <Link variant="body2" component="button" onClick={() => setOpenForgot(true)}>
            Forgot password?
          </Link>
          <ForgotPassword open={openForgot} handleClose={handleCloseForgot} email={email} />
        </Grid>
        <Grid item xs={6}>
          <Link variant="body2" component="button" onClick={props.toggleSignIn}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </DialogContent>
  );
}