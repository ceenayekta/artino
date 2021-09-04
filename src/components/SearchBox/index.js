import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  searchIcon: {
    padding: "0",
    width: "2.5rem",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.main,
    cursor: "pointer",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
  },
  input: {
    marginRight: "1rem",
    flex: 1,
  },
}));

const SearchBox = ({ placeholder }) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <form onSubmit={onFormSubmit} className={classes.search}>
      <TextField
        label={placeholder}
        value={searchValue}
        onChange={onChangeHandler}
        className={classes.input}
      />
      <IconButton
        onClick={onFormSubmit}
        type="submit"
        className={classes.searchIcon}
        component="span"
      >
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBox;
