import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ActiveTimerScreen = ({ time, duration, onTimeUp, startCountdown, restartTimer }) => {
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    startCountdown();
    setTimeLeft(moment(time).format("mm:ss"));

    const intervalId = setInterval(() => {
      startCountdown();
      setTimeLeft(moment(time).format("mm:ss"));
    }, 1000);

    const timeOutId = setTimeout(() => {
      clearInterval(intervalId);
      restartTimer();
      onTimeUp();
    }, duration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeOutId);
    };
  }, []);

  return <span className="time__left">{timeLeft}</span>;
};

export default ActiveTimerScreen;

ActiveTimerScreen.propTypes = {
  time: PropTypes.object,
  duration: PropTypes.object,
  onTimeUp: PropTypes.func,
  startCountdown: PropTypes.func,
  restartTimer: PropTypes.func,
};
