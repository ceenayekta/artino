import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Form from "./Form";
import CategoriesTableData from "./CategoriesTableData";
import { getCategoriesList } from "../../utils/categoriesUtils";
import Notifications from "../../components/Notifications";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "25rem",
  },
  tableDataContainer: {},
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    margin: theme.spacing(1),
  },
}));

const CategoriesPageContent = () => {
  const classes = useStyles();

  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    getCategoriesList({ categoriesList, setCategoriesList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isAnyError, setIsAnyError] = useState(false);
  const [isAnySuccess, setIsAnySuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const categoriesPageState = {
    categoriesList,
    setCategoriesList,
    isAnyError,
    setIsAnyError,
    isAnySuccess,
    setIsAnySuccess,
    errorText,
    setErrorText,
    successText,
    setSuccessText,
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item className={classes.formContainer}>
          <Paper className={classes.paper}>
            <Form categoriesPageState={categoriesPageState} />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.tableDataContainer}>
          <Paper className={classes.paper}>
            <CategoriesTableData categoriesPageState={categoriesPageState} />
          </Paper>
        </Grid>
      </Grid>
      {isAnyError && (
        <Notifications
          severity="error"
          notificationText={errorText}
          open={isAnyError}
          clearUp={setIsAnyError}
          duration={6000}
        />
      )}
      {isAnySuccess && (
        <Notifications
          severity="success"
          notificationText={successText}
          open={isAnySuccess}
          clearUp={setIsAnySuccess}
          duration={6000}
        />
      )}
    </>
  );
};

export default CategoriesPageContent;
