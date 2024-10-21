import React from 'react';

const Timer = ({ timeRemaining }) => {
  // Formatting time in the required format
  const formattedTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${remainingSec < 10 ? '0' : ''}${remainingSec}`;
  };

  return (
    <div
      className="timer"
      style={{
        position: 'absolute',
        right: '5vh',
        top: '5vh',
        border: '1px solid #555',
        borderRadius: '5px',
        padding: '0.5%'
      }}>
      Time Remaining: <span style={{ fontWeight: 'bold' }}>{formattedTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
