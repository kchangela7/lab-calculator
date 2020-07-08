import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth } from '../../firebase';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function ForgotPassword(props: any) {
  const { displayFeedback } = useContext(LoadingContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    setEmail(props.email)
  }, [props])

  const handleReset = (event: any, email: string) => {
    displayFeedback("loading", "Sending...");
    event.preventDefault();
    auth().sendPasswordResetEmail(email)
    .then(() => {
      displayFeedback("success", "Sent! Check your email for the reset link.");
      props.handleClose();
    })
    .catch((error) => {
      displayFeedback("error", "Could not send reset email");
      console.error("A password reset error occured: ", error)
      if (error.code === "auth/user-not-found") {
        setError("There is no account with that email address")
      } else {
        setError("An error occured")
      }
      console.log(email);
    })
  }

  return (
    <div>
      <Dialog 
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
        <form onSubmit={(event) => handleReset(event, email)}>
          <DialogContent>
            <DialogContentText>
              To reset your password, please enter the email associated with the account below. 
              An email will be sent with a link to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              error={error ? true : false}
              helperText={error}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Send Reset Email
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}