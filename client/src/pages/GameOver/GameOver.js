import React from "react";
import { Link } from "react-router-dom";

const GameOver = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-7xl md:text-8xl font-extrabold text-red-600 animate-pulse">
        GAME OVER
      </h1>
      <p className="text-2xl md:text-3xl mt-4 mb-8">Time has run out!</p>
      {/* <Link
        to="/mainpage"
        className="px-8 py-3 text-lg bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
      >
        Back to Main Page
      </Link> */}
    </div>
  );
};

export default GameOver;
