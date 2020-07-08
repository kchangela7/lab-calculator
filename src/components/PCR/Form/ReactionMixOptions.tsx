import React, { useContext, useState, useEffect } from "react";
import { ReactionMix } from "../../../models/ReactionMix";
import { db } from "../../../firebase";
import { AuthContext } from "../../../contexts/AuthContext";
import { MenuItem, TextField, Typography, IconButton, ListItemSecondaryAction, makeStyles } from "@material-ui/core";
import { ReactionContext } from "../../../contexts/ReactionContext";
import EditIcon from '@material-ui/icons/Edit';
import NewMixForm from "./NewMixForm";
import RequireSignIn from "../../Authentication/RequireSignIn";

const useStyles = makeStyles((theme) => ({
  menu: {
    height: 50
  }
}));

// Reaction mix data for selection
const initialOptions = [
  {
    value: 'A',
    label: 'A',
    data: new ReactionMix(50, 20, 2, 10, 7, 7, 2.3),
    author: "General lab mix ratios"
  },
  {
    value: 'B',
    label: 'B',
    data: new ReactionMix(60, 15, 2, 10, 8, 8, 2.3),
    author: "General lab mix ratios"
  }
];

export default function ReactionMixOptions() {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  const { openCreate, selectedMix, setSelectedMix } = useContext(ReactionContext);

  const [options, setOptions] = useState(initialOptions);
  const [editData, setEditData] = useState({name: "", data: new ReactionMix(0, 0, 0, 0, 0, 0, 0)});

  const onChangeHandler = (event: any) => {
    let value = event.target.value;
    if (value === "create") {
      setEditData({name: "", data: new ReactionMix(0, 0, 0, 0, 0, 0, 0)});
      openCreate();
    } else {
      const selection = options.find((element) => element.value === value);
      if (selection) {
        const data = selection.data;
        const name = selection.value;
        setSelectedMix({name, data});
      }
    }
  }

  const editHandler = (index: number) => {
    const data = options[index].data;
    const name = options[index].value;
    setEditData({name, data});
    openCreate();
    setSelectedMix({name, data});
  }

  useEffect(() => {
    if (user) {
      let unsubscribe = db().collection("users").doc(user.uid).collection("reaction_mix").onSnapshot((snapshot) => {
        console.log("options refreshed");
        const extraOptions: {value: string, label: string, data: ReactionMix, author: string}[] = [];
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            let data = doc.data();
            let name = doc.id;
            extraOptions.push({
              value: name,
              label: name,
              data: new ReactionMix(data.dH2O, data.buffer, data.dNTPs, data.MgSO4, data.primer1, data.primer2, data.taq),
              author: user.displayName
            })
          })
        }
        setOptions(initialOptions.concat(extraOptions));
      })
      return () => {
        unsubscribe()
      };
    } else {
      setOptions(initialOptions);
      setSelectedMix({name: "A", data: initialOptions[0].data});
    }
  }, [user, setSelectedMix])

  

  return (
    <React.Fragment>
      {user ? <NewMixForm currentData={editData} /> : <RequireSignIn />}
      <TextField // Reaction ratios input
        select
        id="reaction-mix" 
        label="ReactionMix Ratios"
        fullWidth
        value={selectedMix.name}
        onChange={(event) => onChangeHandler(event)}
        helperText="Current selected ratio (µL per sample) to the right"
        >
        {options.map((option: any, index: number) => (
          <MenuItem key={option.value} value={option.value}  className={classes.menu}>
          {option.label} ― {option.author}
          {(index > 1) ? 
            <ListItemSecondaryAction>
              <IconButton onClick={() => editHandler(index)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction> :
            null
          }
        </MenuItem>
        ))}
        <MenuItem key="createNew" value="create">
          <Typography color="primary">Create new mix ratios</Typography>
        </MenuItem>
      </TextField>
    </React.Fragment>
  )
}

