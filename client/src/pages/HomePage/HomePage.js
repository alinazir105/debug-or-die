import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { CanvasRevealEffect } from "../../ui";
import { AlertCircle } from "lucide-react";
import GlobalTimer from "../../compenents/GlobalTimer/GlobalTimer";

// Import your images
import wing1 from "../../../src/assests/wing1.jpg";
import wing2 from "../../../src/assests/wing2.jpg";
import engine from "../../../src/assests/engine.jpg";
import tail from "../../../src/assests/tail.jpg";
import landingGear from "../../../src/assests/landing-gear.jpg";
import backgroundImage from "../../../src/assests/bg2.jpg";

// // Store the end time in localStorage
// const TIMER_END_KEY = "system_failure_timer_end";

// // Function to get or set the end time
// const getOrSetTimerEnd = () => {
//   const storedEndTime = localStorage.getItem(TIMER_END_KEY);

//   if (storedEndTime) {
//     // If we have a stored end time, use it
//     return parseInt(storedEndTime, 10);
//   } else {
//     // Otherwise, create a new one (24 hours + 5 seconds from now)
//     const newEndTime = new Date().getTime() + 24 * 3600 * 1000 + 5000;
//     localStorage.setItem(TIMER_END_KEY, newEndTime.toString());
//     return newEndTime;
//   }
// };

const Card = ({ title, children, backgroundImage, questionId }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/questions/${questionId}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-2 border-neutral-800 rounded-xl group/canvas-card flex items-center justify-center max-w-[10vw] w-full mx-auto p-4 relative h-[18vh] bg-black/50 hover:bg-black/60 transition-colors duration-300 overflow-hidden shadow-2xl cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover/canvas-card:scale-110"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          opacity: 1,
          filter: "brightness(1)",
          boxShadow:
            "inset 0 0 50px rgba(100, 38, 38, 0.5), 0 0 30px rgba(180, 38, 38, 0.4)",
        }}
      />

      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-red-800" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-red-800" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-red-800" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-red-800" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <h2 className="text-white text-4xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {title}
        </h2>
      </div>
    </div>
  );
};

export function CanvasRevealEffectDemo() {
  const dangerColors = [[139, 0, 0]];
  const dangerOpacities = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1];

  // Get the timer end time when component mounts
  // const [timerEndTime, setTimerEndTime] = useState(null);

  // useEffect(() => {
  //   // Set the timer end time when component mounts
  //   setTimerEndTime(getOrSetTimerEnd());
  // }, []);

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80"></div>

      {/* Enhanced Header Section */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-3 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] tracking-wider">
          SYSTEM FAILURE DETECTED
        </h1>
        <p className="text-white text-xl font-medium bg-black/60 px-6 py-3 rounded-lg backdrop-blur-sm border-2 border-red-500/30 shadow-[0_0_15px_rgba(0,0,0,0.3)] tracking-wide">
          Click on the damaged components to initiate emergency repairs
        </p>
      </div>

      {/* Replace the old timer implementation with the GlobalTimer component */}
      <div className="fixed top-4 right-4 z-50">
        <GlobalTimer />
      </div>

      {/* <div className="fixed top-4 right-4 z-50">
        {timerEndTime && (
          <FlipClockCountdown
            to={timerEndTime}
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
          >
            Finished
          </FlipClockCountdown>
        )}
      </div> */}

      <div className="relative h-screen w-full">
        <div className="absolute left-[22.5%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix Wing 1"
            description="Fix Wing 1"
            backgroundImage={wing1}
            questionId="67b04069caaccbe3ef11b83a"
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[34%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix Wing 2"
            description="Fix Wing 2"
            backgroundImage={wing2}
            questionId="67ae0e4db5eb699a6a012cc3"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[51.5%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix the Tail"
            description="Fix Tail"
            backgroundImage={tail}
            questionId="67ae0f10b5eb699a6a012cc7"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[68.5%] top-[31.8%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix Engine 1"
            description="Fix Engine 1"
            backgroundImage={engine}
            questionId="67b040e0caaccbe3ef11b83c"
          >
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[80%] top-[31.8%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix Engine 2"
            description="Fix Engine 2"
            backgroundImage={engine}
            questionId="67ae0e98b5eb699a6a012cc5"
          >
            <CanvasRevealEffect
              animationSpeed={2.5}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[51.5%] top-[55%] transform -translate-x-1/2 -translate-y-1/2">
          <Card
            title="Fix Landing Gear"
            description="Fix Landing Gear"
            backgroundImage={landingGear}
            questionId="67ae0fa9b5eb699a6a012cc9"
          >
            <CanvasRevealEffect
              animationSpeed={3.5}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default CanvasRevealEffectDemo;
