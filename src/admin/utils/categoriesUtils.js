import { categoriesApi } from "../api/actions";
import { popSuccess, popError } from "../../utils/global";

export const getCategoriesList = ({ categoriesList, setCategoriesList }) => {
  categoriesApi
    .receive()
    .then((res) => setCategoriesList(res.data))
    .catch((err) => {
      setCategoriesList(categoriesList);
    });
};

export const createHandler = (formState) => {
  const {
    categoriesList,
    setCategoriesList,
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setSuccessText,
    createdName,
    setCreatedName,
    createdParent,
    setCreatedParent,
  } = formState;

  if (!createdName) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "نام دسته بندی جدید را وارد کنید !"
    );
    return;
  }

  //check if category with createdName already exists
  if (categoriesList.find((category) => category.name === createdName)) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setSuccessText,
      `دسته بندی با نام ${createdName} قبلا ایجاد شده است`
    );
    return;
  }

  const requestBody = createdParent
    ? {
        name: createdName,
        isMainCategory: false,
        parentId: createdParent._id,
      }
    : {
        name: createdName,
        isMainCategory: true,
      };

  categoriesApi
    .create(requestBody)
    .then(() => {
      popSuccess(
        setIsAnyError,
        setIsAnySuccess,
        setSuccessText,
        "دسته بندی اصلی جدید با موفقیت ساخته شد"
      );
    })
    .catch((err) => {
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "خطای ارتباط با سرور !"
      );
    })
    .finally(() => {
      getCategoriesList({ categoriesList, setCategoriesList });
      setCreatedName("");
      setCreatedParent("");
    });
};

export const deleteHandler = (tableDataState, id) => {
  const {
    categoriesList,
    setCategoriesList,
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setSuccessText,
  } = tableDataState;

  categoriesApi
    .remove(id)
    .then((res) => {
      popSuccess(
        setIsAnyError,
        setIsAnySuccess,
        setSuccessText,
        "دسته بندی مورد نظر حذف شد"
      );
    })
    .catch((err) => {
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "حذف دسته بندی با مشکل مواجه شد !"
      );
    })
    .finally(() => getCategoriesList({ categoriesList, setCategoriesList }));
};

export const editHandler = (tableDataState, parentCategory, id) => {
  const {
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setEditId,
    setEditedName,
    setEditedParent,
  } = tableDataState;

  categoriesApi
    .receiveOne(id)
    .then((res) => {
      setEditedName(res.data.name);
      setEditedParent(parentCategory);
      setEditId(id);
    })
    .catch((err) => {
      setEditedName("");
      setEditedParent("");
      setEditId("");
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "خطای ارتباط با سرور !"
      );
    });
};

export const submitEdit = (tableDataState, id) => {
  const {
    categoriesList,
    setCategoriesList,
    setIsAnyError,
    setIsAnySuccess,
    setErrorText,
    setSuccessText,
    editId,
    setEditId,
    editedName,
    setEditedName,
    editedParent,
    setEditedParent,
  } = tableDataState;

  if (!editedName) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      "نام دسته بندی را وارد کنید !"
    );
    return;
  }

  //check if category with editedName already exists
  if (
    categoriesList.find(
      (category) => category.name === editedName && category._id !== editId
    )
  ) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      `دسته بندی با نام ${editedName} قبلا ایجاد شده است`
    );
    return;
  }

  //check if category is others' parent
  if (
    categoriesList.find((category) => category.parentId === id && editedParent)
  ) {
    popError(
      setIsAnyError,
      setIsAnySuccess,
      setErrorText,
      `این دسته بندی،والد دسته بندی های دیگر است و نمیتواند والد داشته باشد.`
    );
    return;
  }

  const requestBody = editedParent
    ? {
        name: editedName,
        isMainCategory: false,
        parentId: editedParent._id,
      }
    : {
        name: editedName,
        isMainCategory: true,
      };

  categoriesApi
    .update(id, requestBody)
    .then((res) => {
      // also update every category that the updated data name was its parent
      // categoriesList.forEach((category) => {
      //   if (category.parent === res.data.name)
      //     categoriesApi
      //       .update(category._id, {
      //         name: category.name,
      //         parent: editedName,
      //       })
      //       .then((res) => {})
      //       .catch((err) => {});
      // });
      popSuccess(
        setIsAnyError,
        setIsAnySuccess,
        setSuccessText,
        "تغییرات بر روی دسته بندی مورد نظر انجام شد"
      );
    })
    .catch((err) => {
      console.log(err);
      popError(
        setIsAnyError,
        setIsAnySuccess,
        setErrorText,
        "خطای ارتباط با سرور !"
      );
    })
    .finally(() => {
      setEditId("");
      setEditedName("");
      setEditedParent("");
      getCategoriesList({ categoriesList, setCategoriesList });
    });
};

export const cancelEdit = (tableDataState) => {
  const {
    setIsAnyError,
    setIsAnySuccess,
    setSuccessText,
    setEditId,
    setEditedName,
    setEditedParent,
  } = tableDataState;

  setEditId("");
  setEditedName("");
  setEditedParent("");

  popSuccess(
    setIsAnyError,
    setIsAnySuccess,
    setSuccessText,
    "تغییرات بر روی دسته بندی، لغو شد"
  );
};
