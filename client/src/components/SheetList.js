import React, { useState, useEffect } from "react";
import axios from "axios";

const SheetList = () => {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    axios.get("/api/sheets/sheet-list").then(res => {
      console.log(res);
      setSheets(res.data.data);
    });
  }, []);

  const sheetListMap = sheets.map(sheet => {
    return <div key={sheet.id}>{sheet.name}</div>;
  });

  return (
    <div>
      <h3>Sheet List</h3>
      {sheetListMap}
    </div>
  );
};

export default SheetList;
