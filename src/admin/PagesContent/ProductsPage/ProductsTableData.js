import { makeStyles, TableCell, TableRow } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import CustomTable from '../../components/Table'
import TableActions from '../../components/Table/TableActions'
import { deleteHandler, editHandler } from '../../utils/productsUtils';

const useStyles = makeStyles((theme) => ({
    TableCell: {
      textAlign: "center",
    },
}));

const ProductsTableData = ({ productsPageState }) => {
    const classes = useStyles();

    const [editId, setEditId] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedParent, setEditedParent] = useState("");
  
    const {
      productsList,
      // setProductssList,
      isAnyError,
      // setIsAnyError, 
      // isAnySuccess,
      // setIsAnySuccess, 
      // errorText, 
      // setErrorText,
      // successText, 
      // setSuccessText,
    } = productsPageState;
    
    const tableDataState = {
      ...productsPageState,
      editId,
      setEditId,
      editedName,
      setEditedName,
      editedParent,
      setEditedParent,
    }  

    const tableData = productsList.map((data, index) => (
        <TableRow key={data._id}>
            <TableCell className={classes.TableCell}>{index + 1}</TableCell>
            {/* change the src to {data.image} later */}
            <TableCell className={classes.TableCell}><img alt="/asset/1.jpg" src="/asset/1.jpg" width="100px"/></TableCell>
            <TableCell className={classes.TableCell}>{data.name}</TableCell>
            <TableCell className={classes.TableCell}>{data.price}</TableCell>
            <TableCell className={classes.TableCell}>{data.discount}</TableCell>
            <TableCell className={classes.TableCell}>
            <TableActions editHandler={() => editHandler(tableDataState, data._id)} deleteHandler={() => deleteHandler(tableDataState, data._id)} />
            </TableCell>
        </TableRow>
        ))

    return (
        <CustomTable
            tableName={"محصولات"}
            tableTitles={[
                "ردیف",
                "عکس",
                "نام",
                "قیمت",
                "تخفیف",
            ]}
            tableData={tableData}
        />
    )
}

export default ProductsTableData
