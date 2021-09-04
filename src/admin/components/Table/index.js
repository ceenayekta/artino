import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  TableCell: {
    textAlign: "center",
  },
  seeMore: {
    marginTop: theme.spacing(3),
    textAlign: "center",
  },
}));

export default function CustomTable({ tableName, tableTitles, tableData }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {tableName}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableTitles.map((title) => (
              <TableCell key={title} className={classes.TableCell}>
                <b>{title}</b>
              </TableCell>
            ))}
            <TableCell className={classes.TableCell}>
              <b>عملیات</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableData}</TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          بیشتر
        </Link>
      </div>
    </React.Fragment>
  );
}
