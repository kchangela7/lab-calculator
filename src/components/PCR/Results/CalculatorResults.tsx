import React, { useContext } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { CalculatorContext } from '../../../contexts/CalculatorContext'
import { ReactionContext } from '../../../contexts/ReactionContext';
import WellsDisplay from "./WellsDisplay";
import MixDisplay from '../MixDisplay';

export default function CalculatorResults() {
  const { wells, amount } = useContext(CalculatorContext); // Get variable values from context
  const { mix } = useContext(ReactionContext);

  const calculationAmount = (amount <= 12) ? 14 : amount + wells.length + 1; // Reaction mix amount calculation

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Result
      </Typography>
      <Grid container spacing={3} justify='center' alignItems='center'>

        <Grid item xs={12}>
          <Typography variant="h6">Wells</Typography>
          <WellsDisplay />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            {amount} ‒{">"} {calculationAmount}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Reaction Mix</Typography>
          <MixDisplay mix={mix.calculateNew(calculationAmount)}/>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}
