import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import CustomTable from "../../components/Table";
import TableActions from "../../components/Table/TableActions";
import {
  deleteHandler,
  editHandler,
} from "../../utils/productsUtils";

const useStyles = makeStyles((theme) => ({
  TableCell: {
    textAlign: "center",
  },
}));

const ProductsTableData = ({ productsPageState }) => {
  const classes = useStyles();

  const { productsList, setIsForm } = productsPageState;
  console.log(productsList);

  const tableData = productsList.map((data, index) => {
    return (
      <TableRow key={data._id}>
        <TableCell className={classes.TableCell}>{index + 1}</TableCell>
        {/* change the src to {data.image} later */}
        <TableCell className={classes.TableCell}>
          <img alt={data.name} src={data.pictureSrc} width="100px" />
        </TableCell>
        <TableCell className={classes.TableCell}>{data.name}</TableCell>
        <TableCell className={classes.TableCell}>{data.price}</TableCell>
        <TableCell className={classes.TableCell}>{data.discount}</TableCell>
        <TableCell className={classes.TableCell}>
          <TableActions
            editHandler={() => {
              editHandler(productsPageState, data._id);
              setIsForm(true);
            }}
            deleteHandler={() => deleteHandler(productsPageState, data._id)}
          />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <CustomTable
      tableName={"محصولات"}
      tableTitles={["ردیف", "عکس", "نام", "قیمت", "تخفیف"]}
      tableData={tableData}
    />
  );
};

export default ProductsTableData;
