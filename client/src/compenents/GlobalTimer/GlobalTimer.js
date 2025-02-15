import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

// Use the same key as in the homepage component
const TIMER_END_KEY = "system_failure_timer_end";

const GlobalTimer = () => {
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Check if there's already a target date in localStorage
    const storedEndTime = localStorage.getItem(TIMER_END_KEY);

    if (storedEndTime) {
      // If target date exists, use it
      setTargetDate(parseInt(storedEndTime, 10));
    } else {
      // If no target date exists, create new one (90 minutes from now)
      const newEndTime = new Date().getTime() + 30 * 1000;
      localStorage.setItem(TIMER_END_KEY, newEndTime.toString());
      setTargetDate(newEndTime);
    }
  }, []);

  // Only render the countdown when targetDate is set
  if (!targetDate) {
    return null;
  }

  return (
    <FlipClockCountdown
      to={targetDate}
      renderMap={[false, true, true, true]}
      labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
      labelStyle={{
        fontSize: 10,
        fontWeight: 500,
        textTransform: "uppercase",
        color: "white",
      }}
      digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
      dividerStyle={{ color: "white", height: 1 }}
      separatorStyle={{ color: "red", size: "6px" }}
      duration={0.5}
      onComplete={() => {
        // Clear the target date when timer completes
        localStorage.removeItem(TIMER_END_KEY);
        navigate("/gameover");
      }}
    >
      Finished
    </FlipClockCountdown>
  );
};

export default GlobalTimer;
