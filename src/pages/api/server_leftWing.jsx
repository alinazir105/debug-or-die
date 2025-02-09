import fs from "fs";
import path from "path";

export default async function leftWingHandler(req, res) {
  if (req.method === "POST") {
    try {
      // Step 1: Save the submitted C++ file
      const uniqueFilename = `submittedFile_${Date.now()}.cpp`;
      const uploadDir = path.join(process.cwd(), "uploads");
      const filePath = path.join(uploadDir, uniqueFilename);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir); // Create 'uploads' directory if it doesn't exist
      }

      // Save the submitted file to the filesystem
      fs.writeFileSync(filePath, req.body.code);

      // Step 2: Run Static Analysis on the submitted code
      const analysisResult = runStaticAnalysis(req.body.code);

      // Step 3: Return the static analysis results
      res.status(200).json({
        message: "Static analysis completed",
        results: analysisResult,
      });
    } catch (error) {
      console.error("Error handling file submission:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}

// Static analysis function
function runStaticAnalysis(code) {
  const errors = [];

  // Check for required functions
  if (!checkForFunction(code, "calculateLiftForce")) {
    errors.push("Missing function 'calculateLiftForce'");
  }

  // Check if correct variables are present
  const requiredVariables = [
    "density",
    "velocity",
    "area",
    "liftCoefficient",
    "airplaneWeight",
    "wingArea",
  ];
  if (!checkVariableNames(code, requiredVariables)) {
    errors.push("Missing required variables");
  }

  // Check the lift force formula (allowing for slight variations in naming or constants)
  if (!checkLiftForceFormula(code)) {
    errors.push("Incorrect lift force formula");
  }

  // Check for return type in the function definition (e.g. double for calculateLiftForce)
  if (!checkReturnType(code, "calculateLiftForce", "double")) {
    errors.push('Incorrect return type for function "calculateLiftForce"');
  }

  // Check for common unit-related issues (e.g., velocity units)
  if (!checkUnits(code)) {
    errors.push(
      "Potential unit issue detected (velocity in km/h instead of m/s)"
    );
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, message: "Code passes static analysis!" };
}

// Helper function to check if function exists in code
function checkForFunction(code, functionName) {
  const regex = new RegExp(`\\b${functionName}\\b`, "g");
  return regex.test(code);
}

// Helper function to check if required variables exist in code
function checkVariableNames(code, requiredVariables) {
  return requiredVariables.every((variable) => code.includes(variable));
}

// Helper function to check if lift force formula is correct
function checkLiftForceFormula(code) {
  const regex =
    /\b0.5\s*\*\s*([a-zA-Z_][a-zA-Z0-9_]*\s*\*\s*pow\([a-zA-Z_][a-zA-Z0-9_]*,\s*2\)\s*\*\s*([a-zA-Z_][a-zA-Z0-9_]*))\b/;
  return regex.test(code);
}

// Helper function to check return type in the function definition
function checkReturnType(code, functionName, expectedReturnType) {
  const regex = new RegExp(`\\b${expectedReturnType}\\b\\s+${functionName}\\b`);
  return regex.test(code);
}

// Check for common unit issues in velocity
function checkUnits(code) {
  const velocityCheck = /velocity\s*=\s*\d+(\.\d+)?\s*;\s*\/\/.*(km\/h)/;
  return !velocityCheck.test(code); // returns true if there's no km/h issue
}
