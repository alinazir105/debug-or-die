import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";

// Use the same key as in the homepage component
const TIMER_END_KEY = "system_failure_timer_end";

const GlobalTimer = () => {
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Check if there's already a target date in localStorage using the same key as homepage
    const storedEndTime = localStorage.getItem(TIMER_END_KEY);
    
    if (storedEndTime) {
      // If target date exists, use it
      setTargetDate(parseInt(storedEndTime, 10));
    } else {
      // If no target date exists, create new one (24 hours + 5 seconds from now)
      const newEndTime = new Date().getTime() + 24 * 3600 * 1000 + 5000;
      localStorage.setItem(TIMER_END_KEY, newEndTime.toString());
      setTargetDate(newEndTime);
    }
  }, []);

  // Only render the countdown when targetDate is set
  if (!targetDate) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 z-50 pointer-events-none">
      <FlipClockCountdown
        to={targetDate}
        renderMap={[false, false, true, true]}
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
    </div>
  );
};

export default GlobalTimer;