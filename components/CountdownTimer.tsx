
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return null;
  }
  return timeLeft;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null;

  if (!timeLeft) {
    return <span className="text-brand-secondary font-bold text-xs md:text-sm uppercase">Live / Ended</span>;
  }

  // @ts-ignore
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex items-center justify-center space-x-1.5 text-xs font-mono">
        {days > 0 && (
            <div className="flex flex-col items-center">
                <span className="font-bold text-white">{String(days)}</span>
                <span className="text-[10px] text-gray-500">d</span>
            </div>
        )}
         {days > 0 && <span className="text-gray-600 -mt-2">:</span>}
      <div className="flex flex-col items-center">
        <span className="font-bold text-white">{String(hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500">h</span>
      </div>
      <span className="text-gray-600 -mt-2">:</span>
      <div className="flex flex-col items-center">
        <span className="font-bold text-white">{String(minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500">m</span>
      </div>
      <span className="text-gray-600 -mt-2">:</span>
      <div className="flex flex-col items-center">
        <span className="font-bold text-white">{String(seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500">s</span>
      </div>
    </div>
  );
};
