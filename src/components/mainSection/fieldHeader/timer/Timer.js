import React, { useContext, useState, useEffect } from "react";
import moment from "moment";

import "../../styles/timer.scss";
import ActiveTimer from "./ActiveTimer";
import { AppContext } from "../../../../context/AppContext";
import { SET_GAME_RESTART } from "../../../../actions/actionsType";

const Timer = ({ timeUpHandler, time }) => {
  const [state, dispatch] = useContext(AppContext);
  // Фиксированное время и продолжительность для удобства
  const fixedTime = moment().set({ ...time });
  const fixedDuration = moment.duration({ ...time });

  const [remainingTime, setRemainingTime] = useState(fixedTime);
  const [durationLeft, setDurationLeft] = useState(moment.duration(fixedDuration));

  // Создаёт фиксированное время для рендера при паузе
  const [timeStamp, setTimeStamp] = useState();
  const createTimeStamp = () => {
    setTimeStamp(remainingTime);
  };

  const restartTimer = () => {
    setRemainingTime(fixedTime);
    setDurationLeft(fixedDuration);
  };

  const startCountdown = () => {
    setRemainingTime(remainingTime.subtract(1, "second"));
    setDurationLeft(durationLeft.subtract(1000, "milliseconds"));
  };

  // Если произошла перезагрузка
  useEffect(() => {
    restartTimer();
    setTimeStamp(fixedTime);
    dispatch({ type: SET_GAME_RESTART, payload: false });
  }, [state.isGameRestarted]);

  // Если пауза - создаём фиксированное время для отображения в таймере
  useEffect(() => {
    createTimeStamp(remainingTime);
  }, [state.isGamePaused]);

  return (
    <div className="time">
      <span>Time left</span>
      {state.isGameStarted && !state.isGamePaused ? (
        <ActiveTimer
          time={remainingTime}
          duration={durationLeft}
          onTimeUp={timeUpHandler}
          startCountdown={startCountdown}
          restartTimer={restartTimer}
        />
      ) : (
        <span className="time__left">{state.isGamePaused ? moment(timeStamp).format("mm:ss") : "01:00"}</span>
      )}
    </div>
  );
};

export default Timer;
