// Create array of sample numbers from user input
export let samplesArray = (tails: string): number[] => {
  let samples: number[] = [];
  let splitted = tails.split(","); //separates individual tails and ranges
  
  for (let i = 0; i < splitted.length; i++) {
    // Check if it is a range
    if (splitted[i].includes("-")) {
      let range = splitted[i].split("-"); //separate range and add to array
      let first = +range[0];
      let last = +range[1];
      if (first >= last) { // Check for input error
        samples.push(-1);
      } else {
        for (let j = first; j <= last; j++) {
          samples.push(j);
        }
      }
    } else {
      samples.push(+splitted[i]);
    }
  }
  return samples;
};

// Create array of controls
export let controlsArray = (c: number): number[] => {
  let x = [];
  let a = -1;
  for (let i = 0; i < c; i++) {
    x[i] = a;
    a--;
  }
  return x;
};

// Create 2D array for Table
export let wellLayout = (tails: number[], controls: number[], check: boolean): number[][] => {
  let array: number[][] = [];
  let rows = Math.ceil((tails.length + controls.length) / 12); // Number of rows calculation

  let x = 0; // Counter for tails array
  let n = 0; // Counter for controls array
  
  if (check) { // Controls only in last row
    for (let row = 0; row < rows; row++) {
      array[row] = [];
      for (let col = 0; col < 12; col++) {
        if (tails[x]) {
          array[row][col] = tails[x];
          x++;
        } else {
          array[row][col] = controls[n];
          n++;
        }
      }
    }
  } else { // One control in each row
    for (let row = 0; row < rows; row++) {
      array[row] = [];
      for (let col = 0; col < 12; col++) {
        if (col === 11 || !tails[x]) { // Add control if last column or no more tails
          array[row][col] = controls[n];
          n++;
        } else {
          array[row][col] = tails[x];
          x++;
        }
      }
    }
  }

  return array;
};

// Determine number of wells for ReactionMix calculation
export let countWells = (wells: number[][]): number => {
  let count = 0;
  for (let row = 0; row < wells.length; row++) {
    for (let col = 0; col < 12; col++) {
      if (wells[row][col]) {
        count++;
      }
    }
  }
  return count;
};

// Convert 2D array to strings for readability
export let wellsNumberToString = (wells: number[][]): string[][] => {
  let newW: string[][] = [];
  for (let row = 0; row < wells.length; row++) {
    newW[row] = [];
    for (let col = 0; col < 12; col++) {
      if (wells[row][col]) {
        if (wells[row][col] < 0) {
          newW[row][col] = "C" + (-1 * wells[row][col]);
        } else {
          newW[row][col] = "" + wells[row][col];
        }
      } else {
        newW[row][col] = "---";
      }
    }
  }
  return newW;
};