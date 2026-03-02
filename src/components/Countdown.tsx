import { useState, useEffect } from "react";
import "./Countdown.css";

interface CountdownProps {
  weddingDate: Date;
  dayLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
}

const calculateTimeLeft = (weddingDate: Date) => {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

function Countdown({
  weddingDate,
  dayLabel = "일",
  hourLabel = "시",
  minuteLabel = "분",
  secondLabel = "초",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">{dayLabel}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="countdown-label">{hourLabel}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="countdown-label">{minuteLabel}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <span className="countdown-number">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="countdown-label">{secondLabel}</span>
      </div>
    </div>
  );
}

export default Countdown;
