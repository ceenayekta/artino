import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Paper, TableCell, TableRow } from '@material-ui/core'
import Dashboard from '../../components/Dashboard'
import CustomTable from '../../components/Table'
import TableActions from '../../components/Table/TableActions'

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  TableCell: {
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))



const ProductsPageContent = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/products')
    .then(res => setData(res.data))
    .catch(err => setData(data)) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editHandler = (id) => {
    // axios.delete(`http://127.0.0.1:8080/api/categories/${id}`)
    console.log(id)
  }
  const deleteHandler = (id) => {
    axios.delete(`http://127.0.0.1:8080/api/products/${id}`)
    .then(() => {
      axios.get('http://127.0.0.1:8080/api/products')
      .then(res => setData(res.data))
      .catch(err => setData(data)) 
    })
    .catch((err) => {
      console.log(err)
    })
  }

    const classes = useStyles();
    const tableData = data.map((data, index) => (
        <TableRow key={data._id}>
          <TableCell className={classes.TableCell}>{index + 1}</TableCell>
          {/* change the src to {data.image} later */}
          <TableCell className={classes.TableCell}><img alt="/asset/1.jpg" src="/asset/1.jpg" width="100px"/></TableCell>
          <TableCell className={classes.TableCell}>{data.name}</TableCell>
          <TableCell className={classes.TableCell}>{data.price}</TableCell>
          <TableCell className={classes.TableCell}>{data.discount}</TableCell>
          <TableCell className={classes.TableCell}>
            <TableActions editHandler={() => editHandler(data._id)} deleteHandler={() => deleteHandler(data._id)} />
          </TableCell>
        </TableRow>
      ))

    return (
        <Dashboard>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                <Paper>
                    {/* <Deposits /> */}
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
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
                </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    )
}

export default ProductsPageContent