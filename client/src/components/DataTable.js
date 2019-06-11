import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TableModal from "./TableModal";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function DataTable({ columns, dataArray, keys }) {
  const [modalData, setModalData] = useState({});

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {keys.map(tableKey => {
              return (
                <TableCell key={columns[tableKey].id}>
                  {columns[tableKey].title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map(row => {
            return (
              <TableRow hover onClick={() => setModalData(row)} key={row.id}>
                {keys.map(tableKey => {
                  return (
                    <TableCell key={row.id + row.cells[tableKey].columnId}>
                      {row.cells[tableKey].value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TableModal
        modalLabels={columns}
        modalData={modalData}
        handleClose={() => setModalData({})}
      />
    </Paper>
  );
}

export default DataTable;
