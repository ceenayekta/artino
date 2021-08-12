import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import Title from "../../components/Title";
import ProductsTableData from "./ProductsTableData";
import Notifications from '../../components/Notifications'

import { getProductsList } from "../../utils/productsUtils";

const useStyles = makeStyles((theme) => ({
  TableCell: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    padding: theme.spacing(2),
    width: "100%",
  },
  formContainer: {
    width: "25rem",
  },
  buttonText: {
    margin: "0 16px 0 0",
  },
}));

const ProductsPageContent = () => {
  const classes = useStyles();

  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    getProductsList({ productsList, setProductsList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isAnyError, setIsAnyError] = useState(false);
  const [isAnySuccess, setIsAnySuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const productsPageState = {
    productsList,
    setProductsList,
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
            <Link href="/admin/dashboard/add-new-product" underline="none">
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submitButton}
              >
                <LaunchIcon color="primary" />
                <Title className={classes.buttonText}>
                  افزودن محصول جدید به لیست
                </Title>
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ProductsTableData productsPageState={productsPageState} />
          </Paper>
        </Grid>
      </Grid>
      {isAnyError && <Notifications severity="error" notificationText={errorText} open={isAnyError} clearUp={setIsAnyError} duration={6000} />}
      {isAnySuccess && <Notifications severity="success" notificationText={successText} open={isAnySuccess} clearUp={setIsAnySuccess} duration={6000} />}
    </>
  );
};

export default ProductsPageContent;
