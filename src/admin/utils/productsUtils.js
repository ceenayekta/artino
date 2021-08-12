import { productsApi } from "../api/actions";

export const getProductsList = ({ productsList, setProductsList }) => {
  productsApi
    .receive()
    .then((res) => setProductsList(res.data))
    .catch((err) => setProductsList(productsList));
};

export const createHandler = (formState) => {
  const {
    productsList,
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
  } = formState;

  if (newProductName && selectedCategory && discount && inventory && description && specifications) {
    setIsAnyError(false);
    //check if category with createdName already exists
    if (productsList.find((product) => product.name === newProductName)) {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText(`محصول با نام ${newProductName} قبلا ایجاد شده است`);
    } else {
      productsApi
        .create({
          name: newProductName,
          category_id: selectedCategory._id,
          price,
          discount,
          inventory,
          description,
          specifications,
        })
        .then(() => {
          setIsAnyError(false);
          setIsAnySuccess(true);
          setSuccessText("دسته بندی جدید با موفقیت ساخته شد");
        })
        .catch((err) => {
          console.log(err);
          setIsAnyError(true);
          setIsAnySuccess(false);
          setErrorText("خطای ارتباط با سرور !");
        })
        .finally(() => clearAll([
          setNewProductName,
          setSelectedCategory,
          setPrice,
          setDiscount,
          setInventory,
          setDescription,
          setSpecifications,
        ]));
    }
  } else {
    setIsAnyError(true);
    setIsAnySuccess(false);
    setErrorText("نام دسته بندی جدید را وارد کنید !");
  }
};

export const deleteHandler = (tableDataState, id) => {
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
    .finally(() => getProductsList({ productsList, setProductsList }));
};

export const editHandler = (tableDataState, id) => {
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
      console.log(res.data.name)
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

export const submitEdit = (tableDataState, id) => {
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
    if (productsList.find((category) => category.name === editedName && category._id !== editId)) {
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
          getProductsList({ productsList, setProductsList });
        });
    }
  } else {
    setIsAnyError(true);
    setIsAnySuccess(false);
    setErrorText("نام دسته بندی را وارد کنید !");
  }
};

export const cancelEdit = (tableDataState) => {
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
  arrayOfSetters.map(setter => setter(''))
}
