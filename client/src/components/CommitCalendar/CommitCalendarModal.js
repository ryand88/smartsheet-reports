import React from "react";

function CommitCalendarModal({ closeModal, data }) {
  const displayDate = new Date(data[0].date);
  displayDate.setMinutes(
    displayDate.getMinutes() + displayDate.getTimezoneOffset()
  );

  const dataMap = data.map((item, index) => {
    return (
      <li key={"modal-item" + index} className="modal-list-item">
        {item.text}
      </li>
    );
  });

  console.log(data);

  return (
    <div className="commit-calendar-modal" onClick={() => closeModal(false)}>
      <div className="calendar-modal-display">
        <h4 className="modal-title">{displayDate.toDateString()}</h4>
        <ul className="modal-list">{dataMap}</ul>
      </div>
    </div>
  );
}

export default CommitCalendarModal;
