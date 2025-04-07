"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const [start, setStart] = useState("");
  const [duration, setDuration] = useState("");
  const [end, setEnd] = useState("");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (start && duration) {
      const startTime = moment(start, "HH:mm");
      const examEnd = moment(startTime).add(Number(duration), "minutes");
      setEnd(examEnd.format("HH:mm"));

      const interval = setInterval(() => {
        const now = moment();
        const diff = moment.duration(examEnd.diff(now));
        if (diff.asMilliseconds() <= 0) {
          setRemaining("00:00:00");
          clearInterval(interval);
        } else {
          setRemaining(
            `${String(diff.hours()).padStart(2, "0")}:${String(
              diff.minutes()
            ).padStart(2, "0")}:${String(diff.seconds()).padStart(2, "0")}`
          );
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start, duration]);

  return (
    <div className="container">
      <h1>Egzaminowy Timer</h1>

      <label>Start (HH:mm):</label>
      <input
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label>Długość (minuty):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      {end && (
        <div className="output">
          <p><strong>Koniec:</strong> {end}</p>
          <p><strong>Pozostały czas:</strong> {remaining}</p>
        </div>
      )}
    </div>
  );
}
