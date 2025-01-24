import React, { useState } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import airplane from "../assets/aeroplane-147495.svg";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

class Example extends Component {
  render() {
    return (
      <FlipClockCountdown
        to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
        renderMap={[false, false, true, true]}
        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
        labelStyle={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
        }}
        digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
        dividerStyle={{ color: "white", height: 1 }}
        separatorStyle={{ color: "red", size: "6px" }}
        duration={0.5}
      >
        Finished
      </FlipClockCountdown>
    );
  }
}

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
      labelPosition: { top: "140px", left: "830px" },
    },
    {
      id: "wings",
      label: "Wings",
      path: "/page2",
      labelPosition: { top: "280px", left: "600px" },
    },
    {
      id: "engine1",
      label: "Engine 1",
      path: "/page3",
      labelPosition: { top: "280px", left: "750px" },
    },
    {
      id: "tail",
      label: "Tail",
      path: "/page4",
      labelPosition: { top: "150px", left: "550px" },
    },
  ];

  const handleMouseEnter = (areaId) => {
    setActiveArea(areaId);
  };

  const handleMouseLeave = () => {
    setActiveArea(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="flex justify-center mt-8 text-5xl font-bold mb-8 text-red-500 absolute top-0 ">
        Debug Or Die
      </h1>
      <div className="absolute top-0 right-0 overflow-hidden">
        <Example />
      </div>
      <div className="relative w-full h-[400px]">
        <motion.div
          className="absolute flex justify-center items-center"
          style={{
            top: "15%",
            left: "35%",
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

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/engine"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Engine
        </Link>
        <Link
          to="/leftWing"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Left Wing
        </Link>
        <Link
          to="/rightWing"
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          Right Wing
        </Link>
        <Link
          to="/landingGear"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Landing Gear
        </Link>
      </div>
    </div>
  );
};


export default HomePage;