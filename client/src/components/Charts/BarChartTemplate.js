import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChartTemplate = ({
  data = [{}],
  onClick = node => console.log("clicked ", node),
  keys = [""],
  indexBy = "",
  // colors = ["#76d275", "#ff6659", "#bdbdbd"],
  colors,
  bottomLegend = "123",
  layout = "horizontal"
}) => {
  console.log(keys);
  return (
    <div style={{ height: `${data.length * 100}px`, width: "100%" }}>
      <ResponsiveBar
        onClick={onClick}
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        layout={layout}
        colors={colors}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: bottomLegend,
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

export default BarChartTemplate;
