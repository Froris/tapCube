import React from "react";
import classNames from "classnames";
import moment from "moment";

const Player = ({ playerInfo, currLogin, onClickHandler }) => {
  const isCurrPlayer = playerInfo.login === currLogin;
  const itemClass = classNames({
    "list-item": true,
    admin: playerInfo.role === "admin",
  });

  return (
    <li className={itemClass}>
      <div className="player-info">
        <span className="player-name">{playerInfo.username}</span>
        <span className="player-id">#{playerInfo._id}</span>
        {isCurrPlayer && <span className="curr-player">( You )</span>}
      </div>
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
            {moment(playerInfo.registerDate).format("DDDo, MMM, YYYY")}
          </span>
        </div>
        <div className="game-stats">
          <span>
            <span className="stat-title">Last score:</span>
            {playerInfo.score}
          </span>
          <span>
            <span className="stat-title">Max score:</span>
            {playerInfo.maxScore}
          </span>
          <span>
            <span className="stat-title">Games count:</span>
            {playerInfo.gamesCount}
          </span>
        </div>
        {playerInfo.role === "gamer" ? (
          <button className="make-admin-btn" onClick={() => onClickHandler(playerInfo.login)}>
            make admin
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default Player;
