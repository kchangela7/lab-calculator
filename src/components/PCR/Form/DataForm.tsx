import React, { useState, useContext } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import { samplesArray, controlsArray, wellLayout, countWells, wellsNumberToString } from './PCRFunctions';
import { CalculatorContext } from '../../../contexts/CalculatorContext';
import MixDisplay from "../MixDisplay";
import { ReactionContext } from '../../../contexts/ReactionContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ReactionMixOptions from './ReactionMixOptions';

export default function DataForm() {
  // Import context data from other components
  const { newData } = useContext(CalculatorContext); 
  const { setMix, selectedMix } = useContext(ReactionContext); 
  const { user } = useContext(AuthContext);

  // States for variables
  const [samples, setSamples] = useState('');
  const [controls, setControls] = useState(0);
  const [everyRow, setEveryRow] = useState(false);
  const [samplesError, setSamplesError] = useState("");
  const [controlsError, setControlsError] = useState("");

  // Calculate and send data using input data
  const handleSubmit = (event: any, samples: string, controls: number, everyRow: boolean, reactionMix: any) => {
    event.preventDefault();
    if (/[-,]$/.test(samples) || /^[-,]/.test(samples)) {
      setSamplesError('Samples cannot begin or end with a "-" or ","');
    } else if (!samples || !controls) {
      setSamplesError(!samples ? "Required" : "");
      setControlsError(!controls ? "Required" : "");
    } else if (!samplesError && !controlsError) {
      const newSamples = samples.replace(/\s/g, ""); // Remove spaces in samples string
      const sampleArray = samplesArray(newSamples); // Generate array for samples
      
      if (sampleArray.includes(-1)) { //Check if invalid range was used
        setSamplesError("Invalid range used");
      } else {
        // Go to PCR Functions file for more info on function behavior
        const controlArray = controlsArray(controls); 
        const wells = wellLayout(sampleArray, controlArray, everyRow); 
        const totalWells = countWells(wells); 
        const newWells = wellsNumberToString(wells); 
        
        // Send data to other components
        newData(newWells, totalWells);
        setMix(reactionMix);

        // Scroll down to results
        const scroll = () => window.scrollTo({ top: 890, behavior: 'smooth'});
        setTimeout(scroll, 500);
      }
    }
  }

  // Updates state values with input chagne
  const onChangeHandler = (event: any) => {
    const { id, value, checked } = event.currentTarget;
    if (samplesError || controlsError) {
      validator(event);
    }
    if (id === "samples") { // Update email value
      setSamples(value);
    } else if (id === "controls") { // Update password value
      setControls(+value);
    } else if (id === "every-row") {
      setEveryRow(checked);
    }
  }

  // Validate user input
  const validator = (event: any) => {
    const { id, value } = event.currentTarget;
    if (id === "samples") {
      if (!value) {
        setSamplesError("Required")
      } else if (/[a-zA-Z+!@#$%^&*()=.]/g.test(value)) {
        setSamplesError('Invalid characters used (only "-" "," and numbers allowed)');
      } else {
        setSamplesError("")
      }
    } else if (id === "controls") {
      if (!value || !controls) {
        setControlsError("Required")
      } else if (value < 0) {
        setControlsError("Control amount must be a positive number");
      } else {
        setControlsError("")
      }
    }
  }

  return (
    <React.Fragment>
      {user ?
        <Typography variant="h6" color="primary">
          Welcome {user.displayName} 
        </Typography> : null
      }
      <Typography variant="h6" gutterBottom>
        Input Your Data
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField // Samples data input
              required
              id="samples"
              label="Sample Numbers"
              fullWidth
              placeholder="eg. 541-562, 574, 576"
              onChange={(event) => onChangeHandler(event)}
              helperText={samplesError ? samplesError :
                'Place dashes "-" for ranges and commas "," between individual samples and different ranges'
              }
              error={samplesError ? true : false}
              onBlur={(event) => validator(event)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <TextField // Controls input
                  required
                  id="controls"
                  label="Number of Controls"
                  fullWidth
                  type="number"
                  error={controlsError ? true : false}
                  helperText={controlsError}
                  onChange={(event) => onChangeHandler(event)}
                  onBlur={(event) => validator(event)}
                />
              </Grid>

              <Grid item>
                <ReactionMixOptions />
              </Grid>

              <Grid item>
                <FormControlLabel // Controls in last row input
                  control={<Checkbox
                    id="every-row"
                    color="primary" 
                    onChange={(event) => onChangeHandler(event)} 
                  />}
                  label="Controls only in last row"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MixDisplay mix={selectedMix.data}/>
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={(event) => handleSubmit(event, samples, controls, everyRow, selectedMix.data)}
            >
              Calculate
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}