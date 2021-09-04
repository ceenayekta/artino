import { popError, popSuccess } from "../../utils/global";
import { imagesApi, productsApi } from "../api/actions";
import { deleteHandler } from "./productsUtils";

export const getImagesList = ({ imagesList, setImagesList }) => {
  productsApi
    .receive()
    .then((res) => setImagesList(res.data))
    .catch((err) => setImagesList(imagesList));
};

export const uploadProductImage = (productId, formState) => {
  const {
    // productsList,
    // setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    setSuccessText,
    newProductName,
    // setNewProductName,
    // selectedCategory,
    // setSelectedCategory,
    // price,
    // setPrice,
    // discount,
    // setDiscount,
    // inventory,
    // setInventory,
    // description,
    // setDescription,
    // specifications,
    // setSpecifications,
    previewProductImage,
    // setPreviewProductImage,
    // previewProductGallery,
    // setPreviewProductGallery,
  } = formState;

  imagesApi
    .create({
      productId,
      isMainPicture: true,
      path: previewProductImage[0],
      alt: newProductName,
      title: newProductName,
    })
    .then((res) => {
      popSuccess(
        setIsAnyError,
        setIsAnySuccess,
        setSuccessText,
        "عکس بزرگ محصول، آپلود شد"
      );
    })
    .catch((err) => {
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "آپلود عکس محصول، با مشکل مواجه شد !"
      );
      deleteHandler(formState, productId);
    });
};

export const uploadProductGallery = (productId, formState) => {
  const {
    // productsList,
    // setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    setSuccessText,
    newProductName,
    // setNewProductName,
    // selectedCategory,
    // setSelectedCategory,
    // price,
    // setPrice,
    // discount,
    // setDiscount,
    // inventory,
    // setInventory,
    // description,
    // setDescription,
    // specifications,
    // setSpecifications,
    // previewProductImage,
    // setPreviewProductImage,
    previewProductGallery,
    // setPreviewProductGallery,
  } = formState;

  for (let i = 0; i < previewProductGallery.length; i++) {
    imagesApi
      .create({
        productId,
        isMainPicture: false,
        path: previewProductGallery[i],
        alt: newProductName,
        title: newProductName,
      })
      .then((res) => {
        popSuccess(
          setIsAnyError,
          setIsAnySuccess,
          setSuccessText,
          "عکس های گالری محصول، آپلود شد"
        );
      })
      .catch((err) => {
        popError(
          setIsAnyError,
          setIsAnySuccess,
          setErrorText,
          "آپلود عکس های گالری محصول، با مشکل مواجه شد !"
        );
        deleteHandler(formState, productId);
      });
  }
};

export const deleteImage = (tableDataState, id) => {
  const {
    productsList,
    setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    setSuccessText,
    // editId,
    // setEditId,
    // editedName,
    // setEditedName,
    // editedParent,
    // setEditedParent,
  } = tableDataState;

  productsApi
    .remove(id)
    .then((res) => {
      setIsAnyError(false);
      setIsAnySuccess(true);
      setSuccessText("دسته بندی مورد نظر حذف شد");
    })
    .catch((err) => {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText("حذف دسته بندی با مشکل مواجه شد !");
    })
    .finally(() => getImagesList({ productsList, setProductsList }));
};

export const editImage = (tableDataState, id) => {
  const {
    // productsList,
    // setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    // setSuccessText,
    // editId,
    setEditId,
    // editedName,
    setEditedName,
    // editedParent,
    setEditedParent,
  } = tableDataState;

  productsApi
    .receiveOne(id)
    .then((res) => {
      setEditedName(res.data.name);
      setEditedParent(res.data.parent);
      setEditId(id);
    })
    .catch((err) => {
      setEditedName("");
      setEditedParent("");
      setEditId("");
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText("خطای ارتباط با سرور !");
    });
};

export const submitEditImage = (tableDataState, id) => {
  const {
    productsList,
    setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    setSuccessText,
    editId,
    setEditId,
    editedName,
    setEditedName,
    editedParent,
    setEditedParent,
  } = tableDataState;

  if (editedName) {
    //check if category with editedName already exists
    if (
      productsList.find(
        (category) => category.name === editedName && category._id !== editId
      )
    ) {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText(`دسته بندی با نام ${editedName} قبلا ایجاد شده است`);
    } else {
      productsApi
        .update(id, {
          name: editedName,
          parent: editedParent,
        })
        .then((res) => {
          // also update every category that the updated data name was its parent
          productsList.forEach((category) => {
            if (category.parent === res.data.name)
              productsApi
                .update(category._id, {
                  name: category.name,
                  parent: editedName,
                })
                .then((res) => {})
                .catch((err) => {});
          });
          setIsAnyError(false);
          setIsAnySuccess(true);
          setSuccessText("تغییرات بر روی دسته بندی مورد نظر انجام شد");
        })
        .catch((err) => {
          setIsAnyError(true);
          setIsAnySuccess(false);
          setErrorText("اعمال تغییرات بر روی دسته بندی با مشکل مواجه شد !");
        })
        .finally(() => {
          setEditId("");
          setEditedName("");
          setEditedParent("");
          getImagesList({ productsList, setProductsList });
        });
    }
  } else {
    setIsAnyError(true);
    setIsAnySuccess(false);
    setErrorText("نام دسته بندی را وارد کنید !");
  }
};

export const cancelEditImage = (tableDataState) => {
  const {
    // productsList,
    // setProductsList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    // setErrorText,
    // successText,
    setSuccessText,
    // editId,
    setEditId,
    // editedName,
    setEditedName,
    // editedParent,
    setEditedParent,
  } = tableDataState;

  setEditId("");
  setEditedName("");
  setEditedParent("");

  setIsAnyError(false);
  setIsAnySuccess(true);
  setSuccessText("تغییرات بر روی دسته بندی، لغو شد");
};

export const clearAll = (arrayOfSetters) => {
  arrayOfSetters.map((setter) => setter(""));
};
