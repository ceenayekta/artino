import React from "react";
import SelectInput from "../../components/Input/SelectInput";
import TextInput from "../../components/Input/TextInput";
import Dropzone from "react-dropzone";
import Num2persian from "num2persian";
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Title from "../../components/Title";
import Notifications from "../../components/Notifications";
import {
  clearAll,
  createHandler,
  submitEdit,
} from "../../utils/productsUtils";

const useStyles = makeStyles((theme) => ({
  goBackLink: {
    display: "flex",
    marginBottom: "1rem",
  },
  arrowForwardIcon: {
    marginRight: "0.5rem",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem",
  },
  priceContainer: {
    marginBottom: "0.5rem",
    "& span": {
      textAlign: "center",
      marginLeft: "2rem",
    },
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  dropzone: {
    padding: theme.spacing(2),
    display: "flex",
    border: "0.25rem dotted #E2E2E2",
    borderRadius: "1rem",
    cursor: "pointer",
    "& p": {
      color: "#AFAFAF",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: "2.25rem",
  },
  actions: {
    display: "flex",
  },
}));

const AddNewProductPageContent = ({ productsPageState }) => {
  const classes = useStyles();

  const {
    categoriesList,
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
    setIsForm,
    isAddingNew,
    setIsAddingNew,
    editId,
  } = productsPageState;

  console.log(selectedCategory);

  const readImage = (importedImages, setPreview) => {
    let imagesSrc = [];
    importedImages.forEach((importedImage) => {
      const reader = new FileReader();
      reader.readAsDataURL(importedImage);
      reader.onloadend = () => {
        imagesSrc.push(reader.result);
      };
    });
    setPreview(imagesSrc);
  };

  const renderImportedImages = (imagesSrc) =>
    imagesSrc.map((imageSrc, index) => (
      <Grid
        key={index}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className={classes.imgContainer}
      >
        <img src={imageSrc} alt={index + 1} height="200px" width="200px" />
      </Grid>
    ));

  const onSubmit = (event) => {
    event.preventDefault();
    isAddingNew
      ? createHandler(productsPageState)
      : submitEdit(productsPageState, editId);
  };

  const clearInputs = () =>
    clearAll([
      setNewProductName,
      setSelectedCategory,
      setPrice,
      setDiscount,
      setInventory,
      setDescription,
      setSpecifications,
      setPreviewProductImage,
      setPreviewProductGallery,
    ]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Button
          onClick={() => {
            clearInputs();
            setIsForm(false);
            setIsAddingNew(false);
          }}
          className={classes.goBackLink}
        >
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
          بازگشت به صفحه لیست محصولات
        </Button>
        <Paper className={classes.paper}>
          <Title>افزودن محصول جدید به لیست</Title>
          <TextInput
            value={newProductName}
            setValue={setNewProductName}
            required
            label="نام محصول جدید"
          />
          <SelectInput
            value={selectedCategory}
            setValue={setSelectedCategory}
            label="دسته بندی"
            selectList={categoriesList.filter(
              (category) => !category.isMainCategory
            )}
            required
            noMainCategory
          />
        </Paper>
        <Paper className={classes.paper}>
          <Title>تعیین قیمت و موجودی</Title>
          <div className={classes.priceContainer}>
            <TextInput
              value={price}
              setValue={setPrice}
              required
              label="قیمت"
              type="number"
            />
            <Typography component="span" variant="span">
              {price ? Num2persian(price) + " تومان" : ""}
            </Typography>
          </div>
          <div className={classes.priceContainer}>
            <TextInput
              value={discount}
              setValue={setDiscount}
              required
              label="تخفیف"
              type="number"
            />
            <Typography component="span" variant="span">
              {discount ? Num2persian(discount) + " تومان" : ""}
            </Typography>
          </div>
          <div>
            <TextInput
              value={inventory}
              setValue={setInventory}
              required
              label="تعداد موجودی"
              type="number"
            />
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <Title>افزودن توضیحات محصول</Title>
          <TextInput
            value={description}
            setValue={setDescription}
            required
            label="توضیحات اجمالی"
          />
        </Paper>
        <Paper className={classes.paper}>
          <Title>افزودن مشخصات</Title>
          <TextInput
            value={specifications}
            setValue={setSpecifications}
            required
            label="شاخصه"
          />
        </Paper>
        <Paper className={classes.paper}>
          <Title>افزودن عکس بزرگ محصول</Title>
          <Dropzone
            onDrop={(acceptedFiles) => {
              readImage(acceptedFiles, setPreviewProductImage);
            }}
            maxFiles={1}
            maxSize={1000000}
            accept="image/jpeg, image/png"
            onDropAccepted={() => {
              setIsAnyError(false);
              setIsAnySuccess(true);
              setSuccessText("عکس بزرگ محصول اضافه شد");
            }}
            onDropRejected={() => {
              setIsAnyError(true);
              setIsAnySuccess(false);
              setErrorText("تنها یک عکس با حجم ۱ مگابایت می‌توان انتخاب کرد");
            }}
            multiple
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={classes.dropzone} {...getRootProps()}>
                  <input required {...getInputProps()} />
                  {previewProductImage[0] ? (
                    renderImportedImages(previewProductImage)
                  ) : (
                    <p>
                      برای انتخاب عکس بزرگ محصول، کلیک کنید و یا عکس را به داخل
                      کادر بکشید.
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </Paper>
        <Paper className={classes.paper}>
          <Title>افزودن گالری عکس محصول</Title>
          <Dropzone
            onDrop={(acceptedFiles) => {
              readImage(acceptedFiles, setPreviewProductGallery);
            }}
            maxFiles={10}
            maxSize={1000000}
            accept="image/jpeg, image/png"
            onDropAccepted={() => {
              setIsAnyError(false);
              setIsAnySuccess(true);
              setSuccessText("عکس های گالری محصول اضافه شدند");
            }}
            onDropRejected={() => {
              setIsAnyError(true);
              setIsAnySuccess(false);
              setErrorText("تا ۱۰ عکس با حجم ۱ مگابایت می‌توان انتخاب کرد");
            }}
            multiple
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <Grid
                  container
                  className={classes.dropzone}
                  {...getRootProps()}
                >
                  <input required {...getInputProps()} />
                  {previewProductGallery[0] ? (
                    renderImportedImages(previewProductGallery)
                  ) : (
                    <p>
                      برای انتخاب گروهی عکس‌ها، کلیک کنید و یا عکس ها را به داخل
                      کادر بکشید.
                    </p>
                  )}
                </Grid>
              </section>
            )}
          </Dropzone>
        </Paper>
        <div className={classes.buttonsContainer}>
          <div className={classes.clearButtonContainer}>
            <Button color="primary" onClick={clearInputs}>
              پاک کردن همه
            </Button>
          </div>
          <div className={classes.actions}>
            <Button type="submit" variant="contained" color="primary">
              تایید
            </Button>
            <Link
              underline="none"
              href="/admin/dashboard/products"
              className={classes.goBackLink}
              style={{ margin: "0rem 1rem 0rem 0rem" }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  clearInputs();
                  setIsForm(false);
                  setIsAddingNew(false);
                }}
              >
                انصراف و بازگشت به لیست محصولات
              </Button>
            </Link>
          </div>
        </div>
      </form>
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

export default AddNewProductPageContent;
