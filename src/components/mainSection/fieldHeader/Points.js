import React from "react";

import "../styles/points.scss";

const Points = ({ points }) => {
  return (
    <div className="points">
      <span>Points</span>
      <span className="points__sum">{points}</span>
    </div>
  );
};

export default Points;
