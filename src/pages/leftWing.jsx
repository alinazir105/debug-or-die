import React, { useState } from "react";

const LeftWing = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to submit");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);

    try {
      const response = await fetch("/api/testLeftWing", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(`File ${selectedFile.name} submitted successfully`);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold absolute top-0 mt-8">
        Left Wing Failing
      </h1>
      <h2 className="text-3xl font-bold mb-8">Download and Submit Your Code</h2>
      <h2 className="text-3xl font-bold mb-8">To Save the Wing</h2>

      <a
        href="/leftWingCode_debug.cpp"
        download="leftWingCode_debug.cpp"
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download Code File
      </a>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        disabled={uploading}
      >
        {uploading ? "Submitting..." : "Submit Code"}
      </button>
    </div>
  );
};

export default LeftWing;
