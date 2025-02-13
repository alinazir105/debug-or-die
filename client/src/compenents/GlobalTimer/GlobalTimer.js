import { useNavigate } from "react-router-dom";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";

const GlobalTimer = () => {
  const navigate = useNavigate();
  const styles = {
    timer: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      zIndex: 50,
      pointerEvents: "none",
    },
  };

  return (
    <div className={styles.timer}>
      <FlipClockCountdown
        to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
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
        onComplete={() => navigate("/gameover")}
      >
        Finished
      </FlipClockCountdown>
    </div>
  );
};

export default GlobalTimer;
