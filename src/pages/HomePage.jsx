import React, { useState } from "react";
import { motion } from "framer-motion";
import airplane from '../assets/aeroplane-147495.svg';
const HomePage = () => {
  const [activeArea, setActiveArea] = useState(null);

  const handleAreaClick = (path) => {
    window.location.href = path;
  };

  const areas = [
    {
      id: "engine2",
      label: "Engine 2",
      path: "/page1",
      labelPosition: { top: "140px", left: "460px" },
    },
    {
      id: "wings",
      label: "Wings",
      path: "/page2",
      labelPosition: { top: "250px", left: "250px" },
    },
    {
      id: "engine1",
      label: "Engine 1",
      path: "/page3",
      labelPosition: { top: "280px", left: "350px" },
    },
    {
      id: "tail",
      label: "Tail",
      path: "/page4",
      labelPosition: { top: "130px", left: "200px" },
    },
  ];

  const handleMouseEnter = (areaId) => {
    setActiveArea(areaId);
  };

  const handleMouseLeave = () => {
    setActiveArea(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Interactive Airplane Guide</h1>

      <div className="relative w-full h-[400px]">
        {/* <motion.div
          className="absolute w-[300px] h-[300px]"
          initial={{ x: -500, y: 0 }}
          animate={{ x: 800, y: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <img
            src={airplane} // Replace with your airplane image URL
            alt="Flying Airplane"
            className="w-full h-auto"
          />
        </motion.div> */}
        <motion.div
          className="absolute flex justify-center items-center"
          style={{
            top: "10%",
            left: "20%",
            transform: "translate(-50%, -50%)", // Center the airplane
            width: "400px",
            height: "300px",
          }}
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0], // Floating effect
            rotate: [0, 2, -2, 0], // Slight rotation for flying
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut", // Smooth easing
          }}
        >
          <img
            src={airplane} // Replace with your airplane image URL
            alt="Flying Airplane"
            className="w-full h-auto"
          />
        </motion.div>


        {areas.map((area) => (
          <div
            key={area.id}
            className={`absolute transition-all duration-300 px-2 py-1 rounded-md text-sm font-semibold
                        ${activeArea === area.id
                ? "bg-blue-500 text-white scale-110"
                : "bg-white text-gray-800 shadow-md"
              }`}
            style={area.labelPosition}
          >
            <button
              onMouseEnter={() => handleMouseEnter(area.id)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick(area.path);
              }}
              className="text-sm font-semibold"
              style={{ cursor: "pointer" }}
            >
              {area.label}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Navigation Guide</h2>
        <div className="grid grid-cols-2 gap-4">
          {areas.map((area) => (
            <div key={area.id} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>
                {area.label} - Page {area.path.slice(-1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
