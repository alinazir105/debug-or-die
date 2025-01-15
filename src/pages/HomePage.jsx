import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="flex justify-center mt-8 text-5xl font-bold mb-8 text-red-500 absolute top-0 ">
        Debug Or Die
      </h1>
      <div className="absolute top-0 right-0">
        <Example />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/page1"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Engine
        </Link>
        <Link
          to="/page2"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Left Wing
        </Link>
        <Link
          to="/page3"
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          Right Wing
        </Link>
        <Link
          to="/page4"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Landing Gear
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
