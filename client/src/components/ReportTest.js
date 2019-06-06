import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  const [completionDaysGoal, setCompletionDaysGoal] = useState(10);

  const onChange = e => {
    setCompletionDaysGoal(e.target.value);
  };

  const classes = useStyles();

  useEffect(() => {
    // console.log(createDateObject("2019-06-02", "12:52 am", 6, true, [9, 17]));

    axios.get(`/api/sheets/${sheetId}`).then(res => {
      setSheetData(res.data);
      setSheetRows(res.data.rows.filter(row => row.cells[8].value)); // remove rows without start date
      // let onSiteMade = [];
      // let onSiteMissed = [];
      // let onSiteNA = [];
      // let verbalMade = [];
      // let verbalMissed = [];
      // let firstVisit = [];
      // let firstVisitMissed = [];
      // let firstVisitNA = [];
      // let completedOnTime = [];
      // let completedOnTimeMissed = [];

      // const rows = res.data.rows.filter(row => row.cells[8].value);
      // const completedRows = rows.filter(
      //   row =>
      //     row.cells[8].value &&
      //     row.cells[9].value &&
      //     row.cells[10].value &&
      //     row.cells[11].value &&
      //     // row.cells[16].value &&
      //     row.cells[14].value
      // );
      // const incompleteRows = rows.filter(
      //   row =>
      //     !row.cells[8].value ||
      //     !row.cells[9].value ||
      //     !row.cells[10].value ||
      //     !row.cells[11].value ||
      //     // row.cells[16].value ||
      //     !row.cells[14].value
      // );
      // setCompletedRows(completedRows);
      // setIncompleteRows(incompleteRows);
      // const completedKPIs = completedRows.reduce(
      //   (current, row) => {
      //     const verbalRequestTime = createDateObject(
      //       row.cells[8].value,
      //       row.cells[9].value,
      //       6,
      //       true
      //     );
      //     const verbalResponseTime = createDateObject(
      //       row.cells[10].value,
      //       row.cells[11].value,
      //       6,
      //       true
      //     );
      //     const onSiteTime = createDateObject(
      //       row.cells[12].value,
      //       "12:00am",
      //       6,
      //       false
      //     );
      //     const completedDate = createDateObject(
      //       row.cells[14].value,
      //       "12:00am",
      //       6,
      //       false
      //     );
      //     // console.log(
      //     //   (Math.abs(verbalResponseTime - verbalRequestTime) / 60) * 60 * 1000
      //     // );
      //     const msToHrs = 60 * 60 * 1000;
      //     if ((verbalResponseTime - verbalRequestTime) / msToHrs > 2) {
      //       current[0]["KPI Missed"] = current[0]["KPI Missed"] + 1;
      //       verbalMissed.push(row);
      //     } else {
      //       current[0]["KPI Made"] = current[0]["KPI Made"] + 1;
      //       verbalMade.push(row);
      //     }

      //     if (!row.cells[12].value) {
      //       current[1]["N/A"] = current[1]["N/A"] + 1;
      //       onSiteNA.push(row);
      //     } else if ((onSiteTime - verbalRequestTime) / msToHrs > 48) {
      //       current[1]["KPI Missed"] = current[1]["KPI Missed"] + 1;
      //       onSiteMissed.push(row);
      //     } else {
      //       current[1]["KPI Made"] = current[1]["KPI Made"] + 1;
      //       onSiteMade.push(row);
      //     }

      //     if (row.cells[13].value) {
      //       current[2]["KPI Missed"] = current[2]["KPI Missed"] + 1;
      //       firstVisitMissed.push(row);
      //     } else if (!row.cells[13].value && !row.cells[12].value) {
      //       current[2]["N/A"] = current[2]["N/A"] + 1;
      //       firstVisitNA.push(row);
      //     } else {
      //       current[2]["KPI Made"] = current[2]["KPI Made"] + 1;
      //       firstVisit.push(row);
      //     }

      //     if (
      //       (completedDate - verbalRequestTime) / msToHrs >
      //       completionDaysGoal * 24
      //     ) {
      //       current[3]["KPI Missed"] = current[3]["KPI Missed"] + 1;
      //       completedOnTimeMissed.push(row);
      //     } else {
      //       current[3]["KPI Made"] = current[3]["KPI Made"] + 1;
      //       completedOnTime.push(row);
      //     }

      //     return current;
      //   },

      //   [
      //     {
      //       kpiType: "Verbal Response",
      //       "KPI Made": 0,
      //       "KPI Missed": 0,
      //       "N/A": 0
      //     },
      //     {
      //       kpiType: "On Site",
      //       "KPI Made": 0,
      //       "KPI Missed": 0,
      //       "N/A": 0
      //     },
      //     {
      //       kpiType: "First Visit",
      //       "KPI Made": 0,
      //       "KPI Missed": 0,
      //       "N/A": 0
      //     },
      //     {
      //       kpiType: `In ${completionDaysGoal} days`,
      //       "KPI Made": 0,
      //       "KPI Missed": 0,
      //       "N/A": 0
      //     }
      //   ]
      // );
      // setCompletedKpiData(completedKPIs);
      // setTables({
      //   onSiteMade,
      //   onSiteMissed,
      //   onSiteNA,
      //   verbalMade,
      //   verbalMissed,
      //   firstVisit,
      //   firstVisitMissed,
      //   firstVisitNA,
      //   completedOnTime,
      //   completedOnTimeMissed
      // });

      console.log(res.data);
    });
  }, [sheetId]);

  useEffect(() => {
    let onSiteMade = [];
    let onSiteMissed = [];
    let onSiteNA = [];
    let verbalMade = [];
    let verbalMissed = [];
    let firstVisit = [];
    let firstVisitMissed = [];
    let firstVisitNA = [];
    let completedOnTime = [];
    let completedOnTimeMissed = [];

    const rows = sheetRows;
    const completedRows = rows.filter(
      row =>
        row.cells[8].value &&
        row.cells[9].value &&
        row.cells[10].value &&
        row.cells[11].value &&
        // row.cells[16].value &&
        row.cells[14].value
    );
    const incompleteRows = rows.filter(
      row =>
        !row.cells[8].value ||
        !row.cells[9].value ||
        !row.cells[10].value ||
        !row.cells[11].value ||
        // row.cells[16].value ||
        !row.cells[14].value
    );
    setCompletedRows(completedRows);
    setIncompleteRows(incompleteRows);
    const completedKPIs = completedRows.reduce(
      (current, row) => {
        const verbalRequestTime = createDateObject(
          row.cells[8].value,
          row.cells[9].value,
          6,
          true
        );
        const verbalResponseTime = createDateObject(
          row.cells[10].value,
          row.cells[11].value,
          6,
          true
        );
        const onSiteTime = createDateObject(
          row.cells[12].value,
          "12:00am",
          6,
          false
        );
        const completedDate = createDateObject(
          row.cells[14].value,
          "12:00am",
          6,
          false
        );
        // console.log(
        //   (Math.abs(verbalResponseTime - verbalRequestTime) / 60) * 60 * 1000
        // );
        const msToHrs = 60 * 60 * 1000;
        if (
          (verbalResponseTime.adjustedDate - verbalRequestTime.adjustedDate) /
            msToHrs >
          2
        ) {
          current[0]["KPI Missed"] = current[0]["KPI Missed"] + 1;
          verbalMissed.push(row);
        } else {
          current[0]["KPI Made"] = current[0]["KPI Made"] + 1;
          verbalMade.push(row);
        }

        if (!row.cells[12].value) {
          current[1]["N/A"] = current[1]["N/A"] + 1;
          onSiteNA.push(row);
        } else if (
          (onSiteTime.adjustedDate - verbalRequestTime.adjustedDate) / msToHrs >
          48
        ) {
          current[1]["KPI Missed"] = current[1]["KPI Missed"] + 1;
          onSiteMissed.push(row);
        } else {
          current[1]["KPI Made"] = current[1]["KPI Made"] + 1;
          onSiteMade.push(row);
        }

        if (row.cells[13].value) {
          current[2]["KPI Missed"] = current[2]["KPI Missed"] + 1;
          firstVisitMissed.push(row);
        } else if (!row.cells[13].value && !row.cells[12].value) {
          current[2]["N/A"] = current[2]["N/A"] + 1;
          firstVisitNA.push(row);
        } else {
          current[2]["KPI Made"] = current[2]["KPI Made"] + 1;
          firstVisit.push(row);
        }

        if (
          (completedDate.originalDate - verbalRequestTime.originalDate) /
            msToHrs >
          completionDaysGoal * 24
        ) {
          current[3]["KPI Missed"] = current[3]["KPI Missed"] + 1;
          completedOnTimeMissed.push(row);
        } else {
          current[3]["KPI Made"] = current[3]["KPI Made"] + 1;
          completedOnTime.push(row);
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
        },
        {
          kpiType: `In ${completionDaysGoal} days`,
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
      firstVisitNA,
      completedOnTime,
      completedOnTimeMissed
    });
  }, [completionDaysGoal, sheetRows]);

  const graphClick = node => {
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
    if (node.indexValue === `In ${completionDaysGoal} days`) {
      if (node.id === "KPI Made") {
        setTableData(tables.completedOnTime);
      } else {
        setTableData(tables.completedOnTimeMissed);
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
        <TextField
          margin="dense"
          id="standard-number"
          label="Days to completion KPI"
          value={completionDaysGoal}
          onChange={onChange}
          type="number"
          // className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <BarChart data={completedKpiData} onClick={graphClick} />
      </Paper>
      {tableData.length > 0 && (
        <DataTable
          columns={sheetData.columns.filter((column, key) => {
            return key === 2 || key === 3 || key === 5 || key === 7;
          })}
          rows={tableData.map(row =>
            row.cells.filter((column, key) => {
              return key === 2 || key === 3 || key === 5 || key === 7;
            })
          )}
        />
      )}
    </div>
  );
};

export default ReportTest;
