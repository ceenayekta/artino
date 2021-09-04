import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: "0px",
    width: "10rem",
  },
}));

export default function SelectInput({
  label,
  selectList,
  value,
  setValue,
  required,
}) {
  const classes = useStyles();
  setValue(value);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label={label}
        required={required}
      >
        <MenuItem value="">
          <em>*اصلی*</em>
        </MenuItem>
        {selectList.map((data) => (
          <MenuItem value={data}>{data.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
