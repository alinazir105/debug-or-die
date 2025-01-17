import React, { useState } from "react";

const RightWing = () => {
  const [selctedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selctedFile) {
      alert(`File ${selctedFile.name} submitted succesfully`);
    } else {
      alert("Please select a file to submit");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold absolute top-0 mt-8">
        Right Wing Failing
      </h1>
      <h2 className="text-3xl font-bold mb-8">Download and Submit Your Code</h2>
      <h2 className="text-3xl font-bold mb-8">To Save the Wing</h2>

      <a
        href="/path/to/your/codefile.zip"
        download
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download Code File
      </a>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Submit Code
      </button>
    </div>
  );
};

export default RightWing;
