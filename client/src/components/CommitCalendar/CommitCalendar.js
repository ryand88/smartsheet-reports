import React, { useRef } from "react";

import "./commit-calendar.css";
import CommitCalendarBlock from "./CommitCalendarBlock";

const sampleData = [
  { date: "2019-10-24", text: "test1" },
  { date: "2019-10-24", text: "test2" },
  { date: "2019-10-20", text: "test3" },
  { date: "2019-10-19", text: "test4" },
  { date: "2019-9-11", text: "test5" },
  { date: "2019-7-23", text: "test6" },
  { date: "2019-5-1", text: "test8" },
  { date: "2019-10-1", text: "test9" },
  { date: "2019-10-1", text: "test0" }
];

function CommitCalendar({ dataArray = sampleData, weeks = 26, label }) {
  const scrollRef = useRef();
  scrollRef.current &&
    (scrollRef.current.scrollLeft = scrollRef.current.scrollWidth);

  const rightNow = new Date();
  const dayOfWeek = rightNow.getDay();
  const newArray = [...Array(weeks * 7 + 1 + dayOfWeek)];
  const calendarLength = newArray.length;

  const blockMap = newArray.map((_, index) => {
    const blockDate = new Date(rightNow);
    blockDate.setDate(blockDate.getDate() - calendarLength + 1 + index);
    const blockDateString = `${blockDate.getFullYear()}-${(
      "0" +
      (blockDate.getMonth() + 1)
    ).slice(-2)}-${("0" + blockDate.getDate()).slice(-2)}`;

    const blockData = dataArray.filter(data => {
      // console.log(data.date, blockDateString);
      return data.date === blockDateString;
    });

    return (
      <CommitCalendarBlock
        label={label}
        key={"commit-calendar-block" + index}
        date={blockDate}
        data={blockData}
        dateString={blockDateString}
      />
    );
  });

  const leftLegend = [" ", "Mon", " ", "Wed", " ", "Fri", " "].map(
    (item, index) => (
      <span key={"commit-calender-days" + index} className="block-day-legend">
        {item}
      </span>
    )
  );

  return (
    <div className="commit-calendar-container">
      <div ref={scrollRef} className="commit-calendar-inner-container">
        <div className="block-legend-container">{leftLegend}</div>
        <div className="block-container">{blockMap}</div>
      </div>
    </div>
  );
}

export default CommitCalendar;
