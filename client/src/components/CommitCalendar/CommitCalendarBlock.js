import React, { useState } from "react";

import CommitCalendarModal from "./CommitCalendarModal";

const greenPalette = [
  "rgb(220,220,220)",
  "#99d18f",
  "#7bc86c",
  "#72c462",
  // "#61bd4f",
  "#5aac44",
  "#519839",
  "#49852e",
  "#4a8327",
  "#3f6f21"
];

const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function CommitCalendarBlock({ date, data, dateString, label = "Entries" }) {
  const [isModalOpen, setModal] = useState(false);

  const displayDate =
    dateString ||
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const dataLength = data.length;

  const firstSunday = date.getDay() === 0 && date.getDate() < 8;

  const toggleModal = () => {
    data.length > 0 && setModal(!isModalOpen);
  };

  return (
    <div
      onClick={toggleModal}
      className="commit-calendar-block"
      style={{
        backgroundColor:
          greenPalette[dataLength] || greenPalette[greenPalette.length - 1]
      }}
    >
      {isModalOpen && (
        <CommitCalendarModal data={data} closeModal={toggleModal} />
      )}
      {firstSunday && (
        <span className="commit-calendar-month">
          {monthArray[date.getMonth()]}
        </span>
      )}
      <div>
        <span className="block-tag">
          {displayDate} <br></br>
          {`${dataLength} ${label}`}
        </span>
      </div>
    </div>
  );
}

export default CommitCalendarBlock;
