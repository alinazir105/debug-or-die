import { useState } from "react";

export default function LeftWingPage() {
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/server_leftWing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.results.success) {
        setResults({ success: true, message: "Code passes static analysis!" });
      } else {
        setResults({ success: false, errors: data.results.errors });
      }
    } catch (error) {
      console.error("Failed to run static analysis", error);
      setResults({ success: false, errors: ["Failed to run static analysis"] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold absolute top-0 mt-8">
        Left Wing Failing
      </h1>
      <h2 className="text-3xl font-bold mt-32 mb-8">
        Download and Submit Your Code
      </h2>
      <h2 className="text-3xl font-bold mb-8">To Save the Wing</h2>

      {/* Download Link */}
      <a
        href="/leftWingCode_debug.cpp"
        download="leftWingCode_debug.cpp"
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download Code File
      </a>

      {/* Text Area for Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your C++ code here"
        className="mt-4 p-4 border border-gray-400 rounded-md w-96 h-60"
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Submit Code
      </button>

      {/* Results */}
      {results && (
        <div className="mt-8 p-4 border rounded-md">
          {results.success ? (
            <p className="text-green-500">{results.message}</p>
          ) : (
            <div>
              <p className="text-red-500">Static Analysis Errors:</p>
              <ul className="list-disc pl-5">
                {results.errors.map((error, index) => (
                  <li key={index} className="text-red-500">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
