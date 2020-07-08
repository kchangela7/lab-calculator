import React from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: '25rem',
  },
});

export default function MixDisplay(props: any) {
  const classes = useStyles();
  const mix = props.mix

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Chemical</StyledTableCell>
            <StyledTableCell align='center'>Amount (µL)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(mix).map((row: any, index: number) => (
            <StyledTableRow key={row}>
              <StyledTableCell align='center'>{row[0]}</StyledTableCell>
              <StyledTableCell align='center' key={index}>{Math.round((row[1] + Number.EPSILON) * 100) / 100}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}