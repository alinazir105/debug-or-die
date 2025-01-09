import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Homepage</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/page1"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Go to Page 1
        </Link>
        <Link
          to="/page2"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Go to Page 2
        </Link>
        <Link
          to="/page3"
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          Go to Page 3
        </Link>
        <Link
          to="/page4"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Go to Page 4
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
