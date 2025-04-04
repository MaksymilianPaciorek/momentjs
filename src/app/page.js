"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";

export default function ExamTimer() {
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState("01:30");
  const [endTime, setEndTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [durHour, durMinute] = duration.split(":" ).map(Number);

    const start = moment().hour(startHour).minute(startMinute).second(0);
    const end = moment(start).add(durHour, 'hours').add(durMinute, 'minutes');
    setEndTime(end.format("HH:mm"));
  }, [startTime, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [durHour, durMinute] = duration.split(":" ).map(Number);
      const start = moment().hour(startHour).minute(startMinute).second(0);
      const end = moment(start).add(durHour, 'hours').add(durMinute, 'minutes');
      const now = moment();

      const diff = moment.duration(end.diff(now));

      if (diff.asMilliseconds() <= 0) {
        setRemainingTime("00:00:00");
      } else {
        setRemainingTime(
          `${String(Math.floor(diff.asHours())).padStart(2, "0")}:${String(diff.minutes()).padStart(2, "0")}:${String(diff.seconds()).padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Egzamin - Odliczanie</h1>

      <div>
        <label className="block">Start:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block">Długość (HH:mm):</label>
        <input
          type="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          step="60"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block">Koniec:</label>
        <input
          type="text"
          value={endTime}
          readOnly
          className="border p-2 rounded w-full bg-gray-100"
        />
      </div>

      <div>
        <label className="block">Pozostały czas:</label>
        <input
          type="text"
          value={remainingTime}
          readOnly
          className="border p-2 rounded w-full bg-gray-100 font-mono"
        />
      </div>
    </div>
  );
}
