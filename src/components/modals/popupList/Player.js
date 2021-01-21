import React from "react";

const Player = ({ playerInfo, onClickHandler }) => {
  return (
    <li className="list-item">
      <span className="player-name">
        {playerInfo.username} <span>#{playerInfo._id}</span>
      </span>
      <div className="stats">
        <div className="player-stats">
          <span>
            <span className="stat-title">Login:</span>
            {playerInfo.login}
          </span>
          <span>
            <span className="stat-title">IP:</span>
            {playerInfo.IP}
          </span>
          <span>
            <span className="stat-title">Registered:</span>
            {playerInfo.registerDate}
          </span>
        </div>
        <div className="game-stats">
          <span>
            <span className="stat-title">Max score:</span>
            {playerInfo.maxScore}
          </span>
          <span>
            <span className="stat-title">Games count:</span>
            {playerInfo.gamesCount}
          </span>
        </div>
      </div>

      <button className="make-admin-btn" onClick={() => onClickHandler(playerInfo.login)}>
        make admin
      </button>
    </li>
  );
};

export default Player;
