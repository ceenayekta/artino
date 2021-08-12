import { categoriesApi } from "../api/actions";

export const getCategoriesList = ({ categoriesList, setCategoriesList }) => {
  categoriesApi
    .receive()
    .then((res) => setCategoriesList(res.data))
    .catch((err) => setCategoriesList(categoriesList));
};

export const createHandler = (formState) => {
  const {
    categoriesList,
    setCategoriesList,
    // isAnyError,
    setIsAnyError,
    // isAnySuccess,
    setIsAnySuccess,
    // errorText,
    setErrorText,
    // successText,
    setSuccessText,
    createdName,
    setCreatedName,
    createdParent,
    setCreatedParent,
  } = formState;
  console.log(createdParent.name)
  if (createdName) {
    setIsAnyError(false);
    //check if category with createdName already exists
    if (categoriesList.find((category) => category.name === createdName)) {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText(`دسته بندی با نام ${createdName} قبلا ایجاد شده است`);
    } else {
      categoriesApi
        .create({
          name: createdName,
          parent: createdParent.name,
        })
        .then(() => {
          getCategoriesList({ categoriesList, setCategoriesList });
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
        .finally(() => {
          setCreatedName("");
          setCreatedParent("");
        });
    }
  } else {
    setIsAnyError(true);
    setIsAnySuccess(false);
    setErrorText("نام دسته بندی جدید را وارد کنید !");
  }
};

export const deleteHandler = (tableDataState, id) => {
  const {
    categoriesList,
    setCategoriesList,
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

  categoriesApi
    .remove(id)
    .then((res) => {
      // also delete every category that the deleted data name was its parent
      categoriesList.forEach((category) => {
        if (category.parent === res.data.name) deleteHandler(tableDataState, category._id);
      });
      setIsAnyError(false);
      setIsAnySuccess(true);
      setSuccessText("دسته بندی مورد نظر حذف شد");
    })
    .catch((err) => {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText("حذف دسته بندی با مشکل مواجه شد !");
    })
    .finally(() => getCategoriesList({ categoriesList, setCategoriesList }));
};

export const editHandler = (tableDataState, id) => {
  const {
    // categoriesList,
    // setCategoriesList,
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

  categoriesApi
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

export const submitEdit = (tableDataState, id) => {
  const {
    categoriesList,
    setCategoriesList,
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
    if (categoriesList.find((category) => category.name === editedName && category._id !== editId)) {
      setIsAnyError(true);
      setIsAnySuccess(false);
      setErrorText(`دسته بندی با نام ${editedName} قبلا ایجاد شده است`);
    } else {
      categoriesApi
        .update(id, {
          name: editedName,
          parent: editedParent.name,
        })
        .then((res) => {
          // also update every category that the updated data name was its parent
          categoriesList.forEach((category) => {
            if (category.parent === res.data.name)
              categoriesApi
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
          getCategoriesList({ categoriesList, setCategoriesList });
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
    // categoriesList,
    // setCategoriesList,
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
