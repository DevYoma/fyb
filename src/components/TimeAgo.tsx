import React from "react";

type TimeAgoProps = {
  timestamp: string; // ISO string or any valid date string
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  };

  const date = new Date(timestamp);

  return <span title={date.toLocaleString()}>{getTimeAgo(date)}</span>;
};

export default TimeAgo;
