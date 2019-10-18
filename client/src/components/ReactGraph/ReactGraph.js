import React from "react";

import GraphBar from "./GraphBar";
import "./react-graph.css";

function ReactGraph({ data, title = "" }) {
  const barMap = data.map(data => {
    return (
      <GraphBar
        key={data.description}
        description={data.description}
        value={data.value}
      />
    );
  });

  return (
    <div className="graph-container">
      <span className="graph-title">{title}</span>
      <ul className="left-legend">
        <li style={{ bottom: "100%" }}>100</li>
        <li style={{ bottom: "90%" }}>90</li>
        <li style={{ bottom: "80%" }}>80</li>
        <li style={{ bottom: "70%" }}>70</li>
        <li style={{ bottom: "60%" }}>60</li>
        <li style={{ bottom: "50%" }}>50</li>
        <li style={{ bottom: "40%" }}>40</li>
        <li style={{ bottom: "30%" }}>30</li>
        <li style={{ bottom: "20%" }}>20</li>
        <li style={{ bottom: "10%" }}>10</li>
        <li style={{ bottom: "0%" }}>0</li>
      </ul>
      <ul className="bars">
        <span className="graph-lines" style={{ bottom: "100%" }} />
        <span className="graph-lines" style={{ bottom: "90%" }} />
        <span className="graph-lines" style={{ bottom: "80%" }} />
        <span className="graph-lines" style={{ bottom: "70%" }} />
        <span className="graph-lines" style={{ bottom: "60%" }} />
        <span className="graph-lines" style={{ bottom: "50%" }} />
        <span className="graph-lines" style={{ bottom: "40%" }} />
        <span className="graph-lines" style={{ bottom: "30%" }} />
        <span className="graph-lines" style={{ bottom: "20%" }} />
        <span className="graph-lines" style={{ bottom: "10%" }} />
        <span className="graph-lines" style={{ bottom: "0%" }} />
        {barMap}
      </ul>
    </div>
  );
}

export default ReactGraph;
