import React, { useContext } from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { CalculatorContext } from '../../../contexts/CalculatorContext';

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
    maxWidth: '60rem',
  },
});

const headerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MixDisplay() {
  const classes = useStyles();
  const { wells } = useContext(CalculatorContext);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headerArray.map((value) => (
              <StyledTableCell align='center' key={value}>{value}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {wells.map((row: string[]) => (
            <StyledTableRow key={row[0]}>
              {row.map((col: string, index: number) => (
                <StyledTableCell align='center' key={row[0] + index}>{col}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}