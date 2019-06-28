import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data, onClick, dataLength = 1 }) => {
  return (
    <div style={{ height: `${data.length * 100}px`, width: "100%" }}>
      <ResponsiveBar
        label={d => {
          let percent = 0;
          switch (d.id) {
            case "KPI Made":
              percent = Math.ceil(
                (d.value / (dataLength - d.data["N/A"])) * 100
              );
              return `${percent}%`;
            case "KPI Missed":
              percent = Math.floor(
                (d.value / (dataLength - d.data["N/A"])) * 100
              );
              return `${percent}%`;
            default:
              return "N/A";
          }
        }}
        labelFormat={d => <tspan style={{ fontSize: "1.6em" }}>{d}</tspan>}
        onClick={onClick}
        data={data}
        keys={["KPI Made", "KPI Missed", "N/A"]}
        indexBy="kpiType"
        margin={{ top: 50, right: 30, bottom: 50, left: 65 }}
        padding={0.3}
        layout="horizontal"
        colors={["#76d275", "#ff6659", "#bdbdbd"]}
        // colors={d => {
        //   switch (d.id) {
        //     case "KPI Made":
        //       return "#76d275";

        //     case "KPI Missed":
        //       return "#ff6659";

        //     default:
        //       return "#bdbdbd";
        //   }
        // }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Completed Service Requests",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 3,
          tickPadding: 1,
          tickRotation: 0,
          // legend: "Verbal Response Time",
          legendPosition: "middle",
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        // labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        labelTextColor="black"
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -10,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 0.5
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
