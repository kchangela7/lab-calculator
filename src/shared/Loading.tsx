import React, { useContext, useEffect, useState } from 'react';
import { Snackbar, CircularProgress, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { LoadingContext } from '../contexts/LoadingContext';

export default function Loading() {
  const { isLoading, success, error, displayFeedback } = useContext(LoadingContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLoading) {
      if (!error && !success) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [isLoading, success, error])

  const handleSnackbarClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    displayFeedback("reset", "");
  }

  const handleAlertClose = () => {
    setOpen(false);
    displayFeedback("reset", "")
  }

  const handleExit = () => {
    if (error || success) {
      setOpen(true);
    }
  }

  return (
  <Snackbar 
    open={open} 
    onClose={handleSnackbarClose}
    onExited={handleExit}
    autoHideDuration={6000}
    message={isLoading ? 
      <Grid container spacing={3} alignItems="center" justify="flex-end">
        <Grid item xs={2}>
          <CircularProgress size={25} />
        </Grid>
        <Grid item xs={10}>
          <Typography>{isLoading}</Typography>
        </Grid>
      </Grid> :
      undefined
    }
  >
    {success ? 
      <Alert onClose={handleAlertClose} severity="success" variant="filled">{success}</Alert> :
      error ?
      <Alert onClose={handleAlertClose} severity="error" variant="filled">{error}</Alert> :
      undefined
    }
  </Snackbar>
  )
}