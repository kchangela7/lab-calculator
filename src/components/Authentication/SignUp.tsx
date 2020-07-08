import React, { useState, useContext } from 'react';
import { Avatar, DialogContent, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { auth } from '../../firebase';
import { LoadingContext } from '../../contexts/LoadingContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props: any) {
  const classes = useStyles();
  const { displayFeedback } = useContext(LoadingContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("")


  // Attempt Sign Up
  const handleSubmit = async (event: any, displayName: string, email: string, password: string) => {
    event.preventDefault();
    displayFeedback("loading", "Signing up...");
    if (!emailError && !passwordError && !nameError) {
      // Create user with Firebase Auth
      const result = await auth().createUserWithEmailAndPassword(email, password)
      .then(() => displayFeedback("success", "You successfully signed up!"))
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          displayFeedback("error", error.message)
        } else {
          displayFeedback("error", "Sign up attempt failed")
        }
        console.error("Error signing up with password and email", error);
      });
      if (result && result.user !== null) { // Add name to user
        await result.user.updateProfile({ displayName });
      }
    }
  }

  // Update input values
  const onChangeHandler = (event: any) => {
    const { name, value } = event.currentTarget;
    if (emailError || passwordError) {
      validator(event)
    }
    if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "email") { // Update email value
      setEmail(value);
    } else if (name === "password") { // Update password value
      setPassword(value);
    }
  }

  // Validate user input
  const validator = (event: any) => {
    const { name, value } = event.currentTarget;
    if (name === "email") { // Email validation
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setEmailError("Invalid email address");
      } else if (!/.edu$/.test(value)) {
        setEmailError("Please use your university email");
      } else {
        setEmailError("");
      }
    }
    if (name === "password") { // Password validation
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else if (!/\d/.test(value)) {
        setPasswordError("Password must include at least one number");
      } else if (!/[a-zA-Z]/.test(value)) {
        setPasswordError("Password must include at least one letter");
      } else {
        setPasswordError("");
      }
    }
    if (name === "displayName") {
      if (value.length >= 12) {
        setNameError("Name cannot be longer than 12 characters long (use only first name)");
      } else {
        setNameError("");
      }
    }
  }

  return (
    <DialogContent className={classes.paper}>
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={(event)=> handleSubmit(event, displayName, email, password)}>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField // Name input
              autoComplete="fname"
              required
              name="displayName"
              variant="outlined"
              fullWidth
              id="displayName"
              label="Name"
              error={nameError ? true : false}
              helperText={nameError}
              onChange={(event) => onChangeHandler(event)}
              onBlur={(event) => validator(event)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField // Email input
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailError ? true : false}
              helperText={emailError}
              onChange={(event) => onChangeHandler(event)}
              onBlur={(event) => validator(event)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField // Password input
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError ? true : false}
              helperText={passwordError}
              onChange={(event) => onChangeHandler(event)}
              onBlur={(event) => validator(event)}
            />
          </Grid>

        </Grid>

        <Button // Submit button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>

        <Grid container justify="center">
          <Grid item>
            <Link component="button" variant="body2" onClick={props.toggleSignIn}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
  );
}