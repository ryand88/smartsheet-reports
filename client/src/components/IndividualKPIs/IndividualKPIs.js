import React, { useState, useEffect } from "react";
import axios from "axios";
import "./individual-kpi.css";

import ReactGraph from "../ReactGraph/ReactGraph";

const nameArray = [
  "JP Dalton",
  "Peter Buhler",
  "Ryan Aston",
  "Tom Lamb",
  "Mikelle LeCheminant"
];

let sheetData;
let sheetRows;
let descriptionColumnIndex;
let attainmentColumnIndex;

function IndividualKPIs() {
  const [userTaskData, setUserTaskData] = useState();

  useEffect(() => {
    if (!sheetData) {
      axios.get(`/api/sheets/5044123192321924`).then(res => {
        sheetData = res.data;
        descriptionColumnIndex = sheetData.columns.find(
          col => col.id === 8677035301201796 //Id of perfomance item column
        ).index;
        attainmentColumnIndex = sheetData.columns.find(
          col => col.id === 2766060790278020 //Id of attainment value column
        ).index;

        sheetRows = res.data.rows;
        const userRowData = sheetRows
          .filter(row => {
            for (const name of nameArray) {
              if (name === row.cells[descriptionColumnIndex].value) return true;
            }
            return false;
          })
          .map(nameRow => {
            return {
              userRowIndex: nameRow.rowNumber - 1,
              userRowId: nameRow.id,
              userRowDisplayName: nameRow.cells[descriptionColumnIndex].value
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
                return (
                  row.parentId === taskParentId &&
                  row.cells[descriptionColumnIndex].value
                );
              })
            };
          });

          setUserTaskData(userCompletionArray);
          console.log(userCompletionArray);
        }
      });
    }
  });

  console.log(attainmentColumnIndex);
  const barGraphMap =
    userTaskData &&
    userTaskData.map(user => {
      const dataArray = user.taskRows.map(task => {
        return {
          description: task.cells[descriptionColumnIndex].displayValue,
          value: task.cells[attainmentColumnIndex].value
            ? task.cells[attainmentColumnIndex].value * 100
            : 0
        };
      });

      return (
        <div className="graph-card" key={user.userRowId}>
          <ReactGraph
            data={dataArray.slice(0, 3)}
            title={user.userRowDisplayName}
          />
        </div>
      );
    });

  return (
    <div className="indiviual-kpi-container">{userTaskData && barGraphMap}</div>
  );
}

export default IndividualKPIs;
