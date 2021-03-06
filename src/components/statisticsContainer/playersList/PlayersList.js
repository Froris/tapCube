import React from "react";

import "./players-list.scss";

const PlayersList = ({ sortedList }) => {
  return (
    <div className="statistics">
      <ul className="players-list">
        {sortedList.map((currentPlayer, index) => {
          return (
            <li className="player" key={"p" + index}>
              <span className="player__name">{currentPlayer.name ? currentPlayer.name : `Player ${index}`}</span>
              <div className="player__score">
                <span>{currentPlayer.points}</span>
                <div className="progress-bar" style={{ width: currentPlayer.rateBarLength }}></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayersList;
