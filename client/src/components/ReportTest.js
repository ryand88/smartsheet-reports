import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import createDateObject from "../utils/createDateObject";

import BarChart from "./Charts/BarChart";
import DataTable from "./DataTable";

const defaultCompleted = [
  {
    kpiType: "Verbal Response",
    "KPI Made": 0,
    "KPI Missed": 0
  },
  {
    kpiType: "On Site",
    "KPI Made": 0,
    "KPI Missed": 0
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1em",
    padding: theme.spacing(3, 2)
  }
}));

const ReportTest = ({ sheetId }) => {
  const [sheetData, setSheetData] = useState({ columns: [] });
  const [sheetRows, setSheetRows] = useState([]);
  const [completedKpiData, setCompletedKpiData] = useState(defaultCompleted);
  const [tableData, setTableData] = useState([]);
  const [tables, setTables] = useState({});
  const [completedRowsState, setCompletedRows] = useState([]);
  const [incompleteRowsState, setIncompleteRows] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    console.log(createDateObject("2019-06-3", "12:52 a", 6));

    axios.get(`/api/sheets/${sheetId}`).then(res => {
      setSheetData(res.data);
      setSheetRows(res.data.rows.filter(row => row.cells[12].value)); // remove rows without start date
      let onSiteMade = [];
      let onSiteMissed = [];
      let onSiteNA = [];
      let verbalMade = [];
      let verbalMissed = [];
      let firstVisit = [];
      let firstVisitMissed = [];
      let firstVisitNA = [];

      const rows = res.data.rows.filter(row => row.cells[12].value);
      const completedRows = rows.filter(
        row =>
          row.cells[12].value &&
          row.cells[13].value &&
          row.cells[14].value &&
          row.cells[15].value &&
          // row.cells[16].value &&
          row.cells[18].value
      );
      const incompleteRows = rows.filter(
        row =>
          !row.cells[12].value ||
          !row.cells[13].value ||
          !row.cells[14].value ||
          !row.cells[15].value ||
          // row.cells[16].value ||
          !row.cells[18].value
      );
      setCompletedRows(completedRows);
      setIncompleteRows(incompleteRows);
      const completedKPIs = completedRows.reduce(
        (current, row) => {
          const verbalRequestTime = createDateObject(
            row.cells[12].value,
            row.cells[13].value,
            6,
            true
          );
          const verbalResponseTime = createDateObject(
            row.cells[14].value,
            row.cells[15].value,
            6,
            true
          );
          const onSiteTime = createDateObject(
            row.cells[16].value,
            "12:00am",
            6,
            false
          );
          // console.log(
          //   (Math.abs(verbalResponseTime - verbalRequestTime) / 60) * 60 * 1000
          // );
          const msToHrs = 60 * 60 * 1000;
          if ((verbalResponseTime - verbalRequestTime) / msToHrs > 2) {
            current[0]["KPI Missed"] = current[0]["KPI Missed"] + 1;
            verbalMissed.push(row);
          } else {
            current[0]["KPI Made"] = current[0]["KPI Made"] + 1;
            verbalMade.push(row);
          }

          if (!row.cells[16].value) {
            current[1]["N/A"] = current[1]["N/A"] + 1;
            onSiteNA.push(row);
          } else if ((onSiteTime - verbalRequestTime) / msToHrs > 48) {
            current[1]["KPI Missed"] = current[1]["KPI Missed"] + 1;
            onSiteMissed.push(row);
          } else {
            current[1]["KPI Made"] = current[1]["KPI Made"] + 1;
            onSiteMade.push(row);
          }

          if (row.cells[17].value) {
            current[2]["KPI Missed"] = current[2]["KPI Missed"] + 1;
            firstVisitMissed.push(row);
          } else if (!row.cells[17].value && !row.cells[16].value) {
            current[2]["N/A"] = current[2]["N/A"] + 1;
            firstVisitNA.push(row);
          } else {
            current[2]["KPI Made"] = current[2]["KPI Made"] + 1;
            firstVisit.push(row);
          }

          return current;
        },

        [
          {
            kpiType: "Verbal Response",
            "KPI Made": 0,
            "KPI Missed": 0,
            "N/A": 0
          },
          {
            kpiType: "On Site",
            "KPI Made": 0,
            "KPI Missed": 0,
            "N/A": 0
          },
          {
            kpiType: "First Visit",
            "KPI Made": 0,
            "KPI Missed": 0,
            "N/A": 0
          }
        ]
      );
      setCompletedKpiData(completedKPIs);
      setTables({
        onSiteMade,
        onSiteMissed,
        onSiteNA,
        verbalMade,
        verbalMissed,
        firstVisit,
        firstVisitMissed,
        firstVisitNA
      });

      console.log(res.data);
    });
  }, [sheetId]);

  console.log(sheetRows);

  const testfunc = node => {
    console.log(node);
    if (node.indexValue === "Verbal Response") {
      if (node.id === "KPI Made") {
        setTableData(tables.verbalMade);
      } else {
        setTableData(tables.verbalMissed);
      }
    } else if (node.indexValue === "On Site") {
      if (node.id === "N/A") {
        setTableData(tables.onSiteNA);
      } else if (node.id === "KPI Made") {
        setTableData(tables.onSiteMade);
      } else {
        setTableData(tables.onSiteMissed);
      }
    } else if (node.indexValue === "First Visit") {
      if (node.id === "N/A") {
        setTableData(tables.firstVisitNA);
      } else if (node.id === "KPI Made") {
        setTableData(tables.firstVisit);
      } else {
        setTableData(tables.firstVisitMissed);
      }
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5">
          FM KPI's - Complete: {completedRowsState.length} / Incomplete:{" "}
          {incompleteRowsState.length}
        </Typography>
        <BarChart data={completedKpiData} onClick={testfunc} />
      </Paper>
      {tableData.length > 0 && (
        <DataTable
          columns={sheetData.columns.filter((column, key) => {
            return key === 2 || key === 3 || key === 6 || key === 8;
          })}
          rows={tableData.map(row =>
            row.cells.filter((column, key) => {
              return key === 2 || key === 3 || key === 6 || key === 8;
            })
          )}
        />
      )}
    </div>
  );
};

export default ReportTest;
