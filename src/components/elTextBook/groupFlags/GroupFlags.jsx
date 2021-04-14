import React from "react";
import "./groupFlags.scss";

function GroupFlags({number, current, handleFlagClick}) {
  let classArea = `textbook-flag__area color-${number}`;
  let classNumber = 'textbook-flag__number'
  if (current === number) {
    classArea += ' current'
    classNumber += ' current'
  }
  return (
    <div className="textbook-flag" onClick={() => handleFlagClick(number)}>
      <div className={classArea}></div>
      <div className={classNumber}>{number + 1}</div>
    </div>
  )
}

export default GroupFlags