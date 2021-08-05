import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  nameInput: {
    minidth: "12.5rem",
  },
}));

export default function TextInput({ label, error, setValue, value }) {
  const classes = useStyles();
  setValue(value)
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField value={value} error={error} onChange={handleChange} label={label} variant="outlined" className={classes.nameInput} />
  );
}
