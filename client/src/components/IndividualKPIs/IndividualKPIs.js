import React, { useState, useEffect } from "react";
import axios from "axios";
// import { ResponsiveBar } from "@nivo/bar";
import "./individual-kpi.css";

import ReactGraph from "../ReactGraph/ReactGraph";
// import BarChartTemplate from "../Charts/BarChartTemplate";

const nameArray = [
  "JP Dalton",
  "Peter Buhler",
  "Ryan Aston",
  "Tom Lamb",
  "Mikelle LeCheminant"
];

let sheetData;
let sheetRows;

function IndividualKPIs() {
  const [userTaskData, setUserTaskData] = useState();

  useEffect(() => {
    if (!sheetData) {
      axios.get(`/api/sheets/5044123192321924`).then(res => {
        sheetData = res.data;
        sheetRows = res.data.rows;
        const userRowData = sheetRows
          .filter(row => {
            for (const name of nameArray) {
              if (name === row.cells[0].value) return true;
            }
            return false;
          })
          .map(nameRow => {
            return {
              userRowIndex: nameRow.rowNumber - 1,
              userRowId: nameRow.id,
              userRowDisplayName: nameRow.cells[0].value
            };
          });

        console.log(userRowData);
        console.log(sheetRows);

        if (sheetData) {
          const userCompletionArray = userRowData.map(userRow => {
            const taskParentId = sheetRows[userRow.userRowIndex + 5].id;

            return {
              ...userRow,
              taskRows: sheetRows.filter(row => {
                return row.parentId === taskParentId && row.cells[0].value;
              })
            };
          });

          setUserTaskData(userCompletionArray);
          console.log(userCompletionArray);
        }
      });
    }
  });

  const barGraphMap =
    userTaskData &&
    userTaskData.map(user => {
      const dataArray = user.taskRows.map(task => {
        return {
          description: task.cells[0].displayValue,
          value: task.cells[3].value ? task.cells[3].value * 100 : 0
        };
      });

      return (
        <div className="graph-card" key={user.userRowId}>
          <ReactGraph data={dataArray} title={user.userRowDisplayName} />
        </div>
      );
    });

  return (
    <div className="indiviual-kpi-container">{userTaskData && barGraphMap}</div>
  );
}

export default IndividualKPIs;

/* <span className="graph-label">{user.userRowDisplayName}</span>
<ResponsiveBar
  data={user.taskRows.map(task => {
    return {
      section: task.cells[0].value,
      [task.cells[0].value]: task.cells[3].value * 100
    };
  })}
  keys={user.taskRows.map(task => task.cells[0].value)}
  indexBy="section"
  minValue={0}
  maxValue={100}
  margin={{ top: 15, right: 30, bottom: 50, left: 60 }}
  padding={0.3}
  layout="vertical"
  colors={{ scheme: "accent" }}
  colorBy="index"
  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
  axisTop={null}
  axisRight={null}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    // legend: user.userRowDisplayName,
    legendPosition: "middle",
    legendOffset: 32
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    // legend: "Verbal Response Time",
    legendPosition: "middle",
    legendOffset: -40
  }}
  titleOffsetX={11}
  titleOffsetY={-28}
  labelSkipWidth={12}
  labelSkipHeight={12}
  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
  animate={true}
  motionStiffness={90}
  motionDamping={15}
/> */
