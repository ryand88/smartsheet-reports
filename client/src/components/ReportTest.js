import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import createDateObject from "../utils/createDateObject";

import BarChart from "./Charts/BarChart";
import DataTable from "./DataTable";
import SideDrawer from "./SideDrawer";
import CommitCalendar from "./CommitCalendar/CommitCalendar";

const defaultCompleted = [
  {
    kpiType: "Response",
    "KPI Made": 0,
    "KPI Missed": 0
  },
  {
    kpiType: "On Site",
    "KPI Made": 0,
    "KPI Missed": 0
  }
];

const now = new Date();
const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, -6, 0, 0);
const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1em",
    padding: theme.spacing(3, 2)
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth
      // width: `calc(100% - ${drawerWidth}px)`
    }
  },
  textField: {
    margin: "5px",
    width: 200
  },
  checkBox: {
    marginTop: "0.5em",
    marginRight: "0.5em"
  }
}));

let commitCalendarData = [];
let whoFixedList = [];

const ReportTest = ({ sheetId, mobileOpen, setMobileOpen }) => {
  const [isDateFilter, toggleDateFilter] = useState(true);
  const [beginDateFilter, setBeginDateFilter] = useState(monthStart);
  const [endDateFilter, setEndDateFilter] = useState(monthEnd);
  const [sheetData, setSheetData] = useState({ columns: [] });
  const [sheetRows, setSheetRows] = useState([]);
  const [completedKpiData, setCompletedKpiData] = useState(defaultCompleted);
  const [tableData, setTableData] = useState([]);
  const [tables, setTables] = useState({});
  const [completedRowsState, setCompletedRows] = useState([]);
  const [incompleteRowsState, setIncompleteRows] = useState([]);
  const [completionDaysGoal, setCompletionDaysGoal] = useState(10);
  const [whoFixed, setWhoFixed] = useState("showAll");
  const [whoInverse, setWhoInverse] = useState(false);
  const [emergencyFilter, setEmergencyFilter] = useState(false);

  const classes = useStyles();

  const whoSelectOnChange = e => {
    const newValue = e.target.value;

    if (newValue === whoFixed) {
      setWhoInverse(!whoInverse);
    } else {
      setWhoFixed(newValue);
    }
  };

  useEffect(
    function fetchSheetData() {
      axios.get(`/api/sheets/${sheetId}`).then(res => {
        setSheetData(res.data);
        setSheetRows(res.data.rows.filter(row => row.cells[8].value)); // remove rows without start date

        whoFixedList = [...res.data.columns[17].options];
      });
    },
    [sheetId]
  );

  useEffect(() => {
    setTableData([]);
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

    let rows = [];

    if (isDateFilter) {
      const lower = beginDateFilter.getDate()
        ? beginDateFilter
        : new Date(-8640000000000000);
      const upper = endDateFilter.getDate()
        ? endDateFilter
        : new Date(8640000000000000);
      rows = sheetRows.filter(row => {
        const rowDate = new Date(row.cells[8].value);
        return rowDate >= lower && rowDate < upper;
      });
    } else {
      rows = sheetRows;
    }

    commitCalendarData = sheetRows.map(item => {
      const location = item.cells[3].value;
      const brand = item.cells[2].value;
      const text = item.cells[5].value;

      return {
        date: item.cells[1].value,
        text: `${location && location.toUpperCase()} - ${brand &&
          brand.toUpperCase()}: ${text}`
      };
    });

    let completedRows = rows.filter(row => {
      return (
        row.cells[8].value &&
        row.cells[9].value &&
        row.cells[10].value &&
        row.cells[11].value &&
        // row.cells[16].value &&
        row.cells[14].value
      );
    });

    const incompleteRows = rows.filter(
      row =>
        !row.cells[8].value ||
        !row.cells[9].value ||
        !row.cells[10].value ||
        !row.cells[11].value ||
        // row.cells[16].value ||
        !row.cells[14].value
    );

    if (whoFixed !== "showAll") {
      completedRows = completedRows.filter(row => {
        return (row.cells[17].value === whoFixed) !== whoInverse;
      });
    }
    const responseKPIhrs = emergencyFilter ? 1 : 2;
    const onSiteKPIhrs = emergencyFilter ? 4 : 48;

    completedRows = completedRows.filter(row => {
      return (
        row.cells[16].value === emergencyFilter ||
        (!emergencyFilter && !row.cells[16].value)
      );
    });

    setCompletedRows(completedRows);
    setIncompleteRows(incompleteRows);

    const completedKPIs = completedRows.reduce(
      (current, row) => {
        const verbalRequestTime = createDateObject(
          row.cells[8].value,
          row.cells[9].value,
          6,
          !emergencyFilter
        );
        const verbalResponseTime = createDateObject(
          row.cells[10].value,
          row.cells[11].value,
          6,
          false
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
        const msToHrs = 60 * 60 * 1000;

        if (
          (verbalResponseTime.adjustedDate - verbalRequestTime.adjustedDate) /
            msToHrs >
          responseKPIhrs
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
          onSiteKPIhrs
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
          kpiType: "Response",
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
          kpiType: "Completion",
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
  }, [
    completionDaysGoal,
    sheetRows,
    isDateFilter,
    beginDateFilter,
    endDateFilter,
    whoFixed,
    whoInverse,
    emergencyFilter
  ]);

  const graphClick = node => {
    if (node.indexValue === "Response") {
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
    if (node.indexValue === "Completion") {
      if (node.id === "KPI Made") {
        setTableData(tables.completedOnTime);
      } else {
        setTableData(tables.completedOnTimeMissed);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <div className="fm-calendar-container">
          <CommitCalendar
            weeks={32}
            dataArray={commitCalendarData}
            label="Requests"
          />
        </div>

        <SideDrawer
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          beginDateFilter={beginDateFilter}
          endDateFilter={endDateFilter}
          setBeginDateFilter={setBeginDateFilter}
          setEndDateFilter={setEndDateFilter}
          isDateFilter={isDateFilter}
          toggleDateFilter={toggleDateFilter}
          completionDaysGoal={completionDaysGoal}
          setCompletionDaysGoal={setCompletionDaysGoal}
          whoFixed={whoFixed}
          whoFixedList={whoFixedList}
          whoInverse={whoInverse}
          whoSelectOnChange={whoSelectOnChange}
          emergencyFilter={emergencyFilter}
          setEmergencyFilter={setEmergencyFilter}
        />
        <BarChart
          data={completedKpiData}
          onClick={graphClick}
          dataLength={completedRowsState.length}
        />
      </Paper>
      {tableData.length > 0 && (
        <DataTable
          dataArray={tableData}
          keys={[2, 3, 5, 7]}
          columns={sheetData.columns}
        />
      )}
    </div>
  );
};

export default ReportTest;
