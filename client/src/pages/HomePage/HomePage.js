import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { CanvasRevealEffect } from "../../ui";

// Import your images
// import wing1 from "../assets/wing1.jpg";
import wing1 from "../../../src/assests/wing1.jpg";
import wing2 from "../../../src/assests/wing2.jpg";
import engine from "../../../src/assests/engine.jpg";
import tail from "../../../src/assests/tail.jpg";
import landingGear from "../../../src/assests/landing-gear.jpg";
import backgroundImage from "../../../src/assests/bg2.jpg";

const Card = ({ title, children, backgroundImage, index }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.location.href = `/page${index}`;
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

      <div className="fixed top-4 right-4 z-50">
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
        >
          Finished
        </FlipClockCountdown>
      </div>

      <div className="relative h-screen w-full">
        <div className="absolute left-[22.5%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card title="Fix Wing 1" backgroundImage={wing1} index={1}>
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[34%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card title="Fix Wing 2" backgroundImage={wing2} index={2}>
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[51.5%] top-[32%] transform -translate-x-1/2 -translate-y-1/2">
          <Card title="Fix the Tail" backgroundImage={tail} index={3}>
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[68.5%] top-[31.8%] transform -translate-x-1/2 -translate-y-1/2">
          <Card title="Fix Engine 1" backgroundImage={engine} index={4}>
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-red-950"
              colors={dangerColors}
              opacities={dangerOpacities}
            />
          </Card>
        </div>

        <div className="absolute left-[80%] top-[31.8%] transform -translate-x-1/2 -translate-y-1/2">
          <Card title="Fix Engine 2" backgroundImage={engine} index={5}>
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
            backgroundImage={landingGear}
            index={6}
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

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

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

// const HomePage = () => {
//   const [activeArea, setActiveArea] = useState(null);

//   const handleAreaClick = (path) => {
//     window.location.href = path;
//   };

//   const areas = [
//     {
//       id: "engine2",
//       label: "Engine 2",
//       path: "/page1",
//       labelPosition: { top: "140px", left: "830px" },
//     },
//     {
//       id: "wings",
//       label: "Wings",
//       path: "/page2",
//       labelPosition: { top: "280px", left: "600px" },
//     },
//     {
//       id: "engine1",
//       label: "Engine 1",
//       path: "/page3",
//       labelPosition: { top: "280px", left: "750px" },
//     },
//     {
//       id: "tail",
//       label: "Tail",
//       path: "/page4",
//       labelPosition: { top: "150px", left: "550px" },
//     },
//   ];

//   const handleMouseEnter = (areaId) => {
//     setActiveArea(areaId);
//   };

//   const handleMouseLeave = () => {
//     setActiveArea(null);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black">
//       <h1 className="flex justify-center mt-8 text-5xl font-bold mb-8 text-red-500 absolute top-0 ">
//         Debug Or Die
//       </h1>
//       <div className="absolute top-0 right-0 overflow-hidden">
//         <Example />
//       </div>
//       <div className="relative w-full h-[400px]">
//         <motion.div
//           className="absolute flex justify-center items-center"
//           style={{
//             top: "15%",
//             left: "35%",
//             transform: "translate(-50%, -50%)", // Center the airplane
//             width: "400px",
//             height: "300px",
//           }}
//           initial={{ y: 0 }}
//           animate={{
//             y: [0, -20, 0], // Floating effect
//             rotate: [0, 2, -2, 0], // Slight rotation for flying
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 4,
//             ease: "easeInOut", // Smooth easing
//           }}
//         >
//           <img
//             src={airplane} // Replace with your airplane image URL
//             alt="Flying Airplane"
//             className="w-full h-auto"
//           />
//         </motion.div>

//         {areas.map((area) => (
//           <div
//             key={area.id}
//             className={`absolute transition-all duration-300 px-2 py-1 rounded-md text-sm font-semibold
//                         ${activeArea === area.id
//                 ? "bg-blue-500 text-white scale-110"
//                 : "bg-white text-gray-800 shadow-md"
//               }`}
//             style={area.labelPosition}
//           >
//             <button
//               onMouseEnter={() => handleMouseEnter(area.id)}
//               onMouseLeave={handleMouseLeave}
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleAreaClick(area.path);
//               }}
//               className="text-sm font-semibold"
//               style={{ cursor: "pointer" }}
//             >
//               {area.label}
//             </button>
//           </div>
//         ))}

//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <Link
//           to="/engine"
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//         >
//           Engine
//         </Link>
//         <Link
//           to="/leftWing"
//           className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//         >
//           Left Wing
//         </Link>
//         <Link
//           to="/rightWing"
//           className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
//         >
//           Right Wing
//         </Link>
//         <Link
//           to="/landingGear"
//           className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//         >
//           Landing Gear
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
