import React from "react";
import { ResponsiveBullet } from "@nivo/bullet";

const data = [
  {
    id: "temp.",
    ranges: [93, 100],
    measures: [],
    markers: []
  }
];

const BulletChart = () => {
  return (
    <div style={{ height: "140px", width: "100%" }}>
      <ResponsiveBullet
        data={data}
        margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
        spacing={46}
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.2}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
        rangeColors="dark2"
      />
    </div>
  );
};

export default BulletChart;
