import React from "react";

import CommitCalendar from "../CommitCalendar/CommitCalendar";

import "./solo-dashboard.css";

function SoloDashboard() {
  return (
    <div className="solo-dashboard-container">
      <h3>dashboard</h3>
      <CommitCalendar />
    </div>
  );
}

export default SoloDashboard;
