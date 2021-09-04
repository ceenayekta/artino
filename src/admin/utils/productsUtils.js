import { popError, popSuccess } from "../../utils/global";
import { productsApi } from "../api/actions";
import { uploadProductGallery, uploadProductImage } from "./imagesUtils";

export const getProductsList = ({ productsList, setProductsList }) => {
  productsApi
    .receive()
    .then((res) => setProductsList(res.data))
    .catch((err) => setProductsList(productsList));
};

export const createHandler = (formState) => {
  const {
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setSuccessText,
    newProductName,
    selectedCategory,
    price,
    discount,
    inventory,
    description,
    specifications,
    previewProductImage,
    previewProductGallery,
  } = formState;

  if (parseInt(price, 10) < parseInt(discount, 10)) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "تخفیف وارد شده نمیتواند از قیمت بیشتر باشد !"
    );
    return;
  }

  if (
    newProductName &&
    selectedCategory &&
    discount &&
    inventory &&
    description &&
    specifications &&
    previewProductImage &&
    previewProductGallery
  ) {
    setIsAnyError(false);
    productsApi
      .create({
        categoryId: selectedCategory._id,
        name: newProductName,
        price,
        discount,
        inventory,
        description,
        specifications,
      })
      .then((res) => {
        popSuccess(
          setIsAnyError,
          setIsAnySuccess,
          setSuccessText,
          "محصول اضافه شد"
        );
        uploadProductGallery(res.data._id, formState);
        uploadProductImage(res.data._id, formState);
        // clearAll([
        //   setNewProductName,
        //   setSelectedCategory,
        //   setPrice,
        //   setDiscount,
        //   setInventory,
        //   setDescription,
        //   setSpecifications,
        //   setPreviewProductImage,
        //   setPreviewProductGallery,
        // ])
      })
      .catch((err) => {
        popError(
          setIsAnyError,
          setIsAnySuccess,
          setErrorText,
          "خطای ارتباط با سرور !"
        );
      });
  } else {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "نام محصول جدید را وارد کنید !"
    );
  }
};

export const deleteHandler = (productsPageState, id) => {
  const {
    productsList,
    setProductsList,
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setSuccessText,
  } = productsPageState;

  productsApi
    .remove(id)
    .then((res) => {
      popSuccess(
        setIsAnyError,
        setIsAnySuccess,
        setSuccessText,
        "محصول مورد نظر حذف شد"
      );
    })
    .catch((err) => {
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "حذف محصول با مشکل مواجه شد !"
      );
    })
    .finally(() => getProductsList({ productsList, setProductsList }));
};

export const editHandler = (productsPageState, id) => {
  const {
    categoriesList,
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setNewProductName,
    setSelectedCategory,
    setPrice,
    setDiscount,
    setInventory,
    setDescription,
    setSpecifications,
    // previewProductImage,
    // setPreviewProductImage,
    // previewProductGallery,
    // setPreviewProductGallery,
    setEditId,
  } = productsPageState;

  productsApi
    .receiveOne(id)
    .then((res) => {
      setNewProductName(res.data.name);
      setSelectedCategory(
        categoriesList.find((category) => category._id === res.data.categoryId)
      );
      setPrice(res.data.price);
      setDiscount(res.data.discount);
      setInventory(res.data.inventory);
      setDescription(res.data.description);
      setSpecifications(res.data.specifications);
      setEditId(id);
    })
    .catch((err) => {
      setNewProductName("");
      setSelectedCategory("");
      setPrice("");
      setDiscount("");
      setInventory("");
      setDescription("");
      setSpecifications("");
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "خطای ارتباط با سرور !"
      );
    });
};

export const submitEdit = (productsPageState, id) => {
  const {
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
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
    setPreviewProductImage,
    setPreviewProductGallery,
  } = productsPageState;

  if (parseInt(price, 10) < parseInt(discount, 10)) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "تخفیف وارد شده نمیتواند از قیمت بیشتر باشد !"
    );
    return;
  }

  if (
    newProductName &&
    selectedCategory &&
    discount &&
    inventory &&
    description &&
    specifications
  ) {
    productsApi
      .update(id, {
        categoryId: selectedCategory._id,
        name: newProductName,
        price,
        discount,
        inventory,
        description,
        specifications,
      })
      .then((res) => {
        popSuccess(
          setIsAnyError,
          setIsAnySuccess,
          setSuccessText,
          "تغییرات بر روی مجصول مورد نظر انجام شد"
        );
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
      })
      .catch((err) => {
        popError(
          setIsAnyError,
          setIsAnySuccess,
          setErrorText,
          "اعمال تغییرات بر روی محصول با مشکل مواجه شد !"
        );
      });
  } else {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "نام دسته بندی را وارد کنید !"
    );
  }
};

export const clearAll = (arrayOfSetters) => {
  arrayOfSetters.map((setter) => setter(""));
};
