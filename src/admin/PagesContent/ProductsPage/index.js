import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import Title from "../../components/Title";
import ProductsTableData from "./ProductsTableData";
import Notifications from "../../components/Notifications";

import { getProductsList } from "../../utils/productsUtils";
import { getImagesList } from "../../utils/imagesUtils";
import AddNewProductPageContent from "../addNewProduct";
import { getCategoriesList } from "../../utils/categoriesUtils";

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

  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  const [isAnyError, setIsAnyError] = useState(false);
  const [isAnySuccess, setIsAnySuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [inventory, setInventory] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");

  const [previewProductImage, setPreviewProductImage] = useState([]);
  const [previewProductGallery, setPreviewProductGallery] = useState([]);

  const [isForm, setIsForm] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getCategoriesList({ categoriesList, setCategoriesList });
    getProductsList({ productsList, setProductsList });
    getImagesList({ imagesList, setImagesList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForm]);

  const productsPageState = {
    categoriesList,
    setCategoriesList,
    productsList,
    setProductsList,
    imagesList,
    setImagesList,
    isAnyError,
    setIsAnyError,
    isAnySuccess,
    setIsAnySuccess,
    errorText,
    setErrorText,
    successText,
    setSuccessText,
    newProductName,
    setNewProductName,
    selectedCategory,
    setSelectedCategory,
    price,
    setPrice,
    discount,
    setDiscount,
    inventory,
    setInventory,
    description,
    setDescription,
    specifications,
    setSpecifications,
    previewProductImage,
    setPreviewProductImage,
    previewProductGallery,
    setPreviewProductGallery,
    isForm,
    setIsForm,
    isAddingNew,
    setIsAddingNew,
    editId,
    setEditId,
  };

  return (
    <>
      {isForm ? (
        <AddNewProductPageContent productsPageState={productsPageState} />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item className={classes.formContainer}>
              <Paper className={classes.paper}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={classes.submitButton}
                  onClick={() => {
                    setIsAddingNew(true);
                    setIsForm(true);
                  }}
                >
                  <LaunchIcon color="primary" />
                  <Title className={classes.buttonText}>
                    افزودن محصول جدید به لیست
                  </Title>
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ProductsTableData productsPageState={productsPageState} />
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
      )}
    </>
  );
};

export default ProductsPageContent;
