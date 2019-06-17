import React from "react";
import BarChartTemplate from "./Charts/BarChartTemplate";

const example = {
  charts: [{ component: "ResponsiveBar" }]
};

const object = {
  data: [
    {
      kpiType: "Verbal Response",
      "KPI Made": 3,
      "KPI Missed": 5,
      "N/A": 1
    }
  ],
  onClick: () => console.log("clicked"),
  keys: [""],
  indexBy: "",
  colors: ["#76d275", "#ff6659", "#bdbdbd"],
  bottomLegend: "",
  layout: "horizontal"
};

const ReportTemplate = () => {
  return (
    <div>
      <BarChartTemplate
        data={[
          {
            kpiType: "Verbal Response",
            "KPI Made": 3,
            "KPI Missed": 5,
            "N/A": 1
          },
          {
            kpiType: "On Site",
            "KPI Made": 1,
            "KPI Missed": 2,
            "N/A": 3,
            test: 5
          }
        ]}
        keys={["KPI Made", "KPI Missed", "N/A", "test"]}
        indexBy="kpiType"
      />
    </div>
  );
};

export default ReportTemplate;
