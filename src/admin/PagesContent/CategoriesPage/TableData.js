import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import SelectInput from '../../components/Input/SelectInput';
import TextInput from '../../components/Input/TextInput';
import CustomTable from '../../components/Table'
import TableActions from '../../components/Table/TableActions';
import Notifications from '../../components/Notifications'
import { cancelEdit, deleteHandler, editHandler, submitEdit } from '../../utils/categoriesUtils';

const useStyles = makeStyles((theme) => ({
    TableCell: {
      textAlign: "center",
    },
}));

const DataTable = ({ categoriesPageState }) => {
  const classes = useStyles();

  const [editId, setEditId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedParent, setEditedParent] = useState("");

  const {
    categoriesList,
    // setCategoriesList,
    isAnyError,
    setIsAnyError, 
    isAnySuccess,
    setIsAnySuccess, 
    errorText, 
    // setErrorText,
    successText, 
    // setSuccessText,
  } = categoriesPageState;
  
  const tableDataState = {
    ...categoriesPageState,
    editId,
    setEditId,
    editedName,
    setEditedName,
    editedParent,
    setEditedParent,
  }  

  const tableData = categoriesList.map((data, index) => {
    return editId === data._id ? (
      <TableRow key={data._id}>
        <TableCell className={classes.TableCell}>{index + 1}</TableCell>
        <TableCell className={classes.TableCell}>
          <TextInput
            value={editedName}
            setValue={setEditedName}
            error={isAnyError}
            label="نام دسته بندی"
          />
        </TableCell>
        <TableCell className={classes.TableCell}>
          <SelectInput
            value={editedParent}
            setValue={setEditedParent}
            label="دسته بندی والد"
            selectList={categoriesList.filter(
              (category) =>
                category.name !== editedName && category.parent === ""
            )}
          />
        </TableCell>
        <TableCell className={classes.TableCell}>
          <IconButton
            onClick={() => submitEdit(tableDataState , data._id)}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => cancelEdit(tableDataState)}
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ) : (
      <TableRow key={data._id}>
        <TableCell className={classes.TableCell}>{index + 1}</TableCell>
        <TableCell className={classes.TableCell}>{data.name}</TableCell>
        <TableCell className={classes.TableCell}>
          {!data.parent ? " *اصلی* " : data.parent}
        </TableCell>
        <TableCell className={classes.TableCell}>
          <TableActions
            editHandler={() => editHandler(tableDataState , data._id)}
            deleteHandler={() => deleteHandler(tableDataState , data._id)}
          />
        </TableCell>
      </TableRow>
    );
  });

    return (
        <>
          <CustomTable
              tableName={"دسته بندی ها"}
              tableTitles={["ردیف", "نام دسته بندی", "دسته بندی والد"]}
              tableData={tableData}
          />
          {isAnyError ? <Notifications severity="error" notificationText={errorText} open={isAnyError} clearUp={setIsAnyError} duration={6000} /> : null}
          {isAnySuccess ? <Notifications severity="success" notificationText={successText} open={isAnySuccess} clearUp={setIsAnySuccess} duration={6000} /> : null}
        </>
        
    )
}

export default DataTable
