import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthContext } from '../../contexts/AuthContext';
import { ReactionContext } from '../../contexts/ReactionContext';

export default function RequireSignIn() {
  const { open, closeCreate } = useContext(ReactionContext);
  const { openAuth } = useContext(AuthContext);

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeCreate}
        aria-labelledby="sign-in-required"
        aria-describedby="sign-in"
      >
        <DialogTitle id="sing-in-required">{"Sign in required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="sign-in">
            To create a new reaction mix, you must be signed in. Please select sign in below to sign in now or create a new account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => openAuth()} color="primary" autoFocus>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}