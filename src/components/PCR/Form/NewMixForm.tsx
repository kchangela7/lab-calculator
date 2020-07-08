import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, InputAdornment, Button, CssBaseline, TextField, Grid, Typography, makeStyles } from '@material-ui/core';
import { ReactionContext } from '../../../contexts/ReactionContext';
import { db } from '../../../firebase';
import { AuthContext } from '../../../contexts/AuthContext';
import { ReactionMix } from '../../../models/ReactionMix';
import { LoadingContext } from '../../../contexts/LoadingContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),

  },
  form: {
    width: '70%',
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));


export default function NewMixForm(props: any) {
  const classes = useStyles();

  const { open, closeCreate, setSelectedMix } = useContext(ReactionContext);
  const { user } = useContext(AuthContext);
  const { displayFeedback } = useContext(LoadingContext);
  
  const mix: {[key: string]: any} = {dH2O: "", buffer: "", dNTPs: "", MgSO4: "", primer1: "", primer2: "", taq: ""}; // Create object to keep track of changes
  const dbRef = db().collection("users").doc(user.uid).collection("reaction_mix");

  const [mixName, setMixName] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(mix);

  useEffect(() => {
    const editData = props.currentData.data;
    const extract = editData.extractData();
    setData(extract);
    setMixName(props.currentData.name);
  }, [props])

  const submitHandler = (event: any, mixName: string, data: any) => {
    event.preventDefault();
    displayFeedback("loading", "Submitting changes")
    if (!error) {
      // Send to Firebase backend
      dbRef.doc(mixName).set(data)
      .then(function() {
        displayFeedback("success", "Changes saved")
        setSelectedMix({name: mixName, data })
        closeCreate();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
        displayFeedback("error", "Failed to complete changes")
      });
    }
  }

  const deleteHandler = (event: any, mixName: string) => {
    event.preventDefault();
    displayFeedback("loading", "Deleting mix...")
    setSelectedMix({name: "A", data: new ReactionMix(50, 20, 2, 10, 7, 7, 2.3)});

    dbRef.doc(mixName).delete()
    .then(() => {
      displayFeedback("success", "Mix was deleted")
      closeCreate();
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
      displayFeedback("error", "Failed to delete mix")
    })
  }
  
  // Update input values
  const onChangeHandler = (event: any) => {
    const { name, value } = event.currentTarget;
    if (name === "mixName") {
      setMixName(value);
      if (value.length < 4) {
        setError("Must be at least 4 characters long");
      } else if (value >= 20) {
        setError("Name cannot be longer than 20 characters");
      } else {
        setError("");
      }
    } else {
      const newData = {...data}
      newData[name] = +value;
      setData(newData);
    }
  }

  return (
    <Dialog open={open} onClose={closeCreate} maxWidth="xs">
      <DialogContent className={classes.paper}>
        <CssBaseline />
        {!props.currentData.name ? 
          <Typography variant="h5">Create Reaction Mix</Typography> :
          <Typography variant="h5">Edit/Delete Reaction Mix</Typography>
        }
        <form className={classes.form} onSubmit={(event) => submitHandler(event, mixName, data)}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <TextField 
                variant={props.currentData.name ? "filled" : "outlined"}
                required
                name="mixName"
                type="string"
                autoFocus
                disabled={props.currentData.name ? true : false}
                fullWidth
                value={mixName}
                label="Mix Reference Name"
                onChange={(event) => onChangeHandler(event)}
                error={error ? true : false}
                helperText={error}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">dH2O:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="dH2O"
                  value={data.dH2O || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Buffer:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="buffer"
                  value={data.buffer || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">dNTPs:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="dNTPs"
                  value={data.dNTPs || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">MgSO4:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="MgSO4"
                  value={data.MgSO4 || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Primer 1:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="primer1"
                  value={data.primer1 || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Primer 2:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="primer2"
                  value={data.primer2 || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Taq:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  variant="outlined"
                  margin="dense"
                  required
                  name="taq"
                  value={data.taq || ""}
                  type="number"
                  onChange={(event) => onChangeHandler(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">µL</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            {!props.currentData.name ? 
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
              >
                Create
              </Button> :
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={(event) => deleteHandler(event, mixName)}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            }
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}