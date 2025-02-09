import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default async function engineHandler(req, res) {
  if (req.method === "POST") {
    try {
      const uniqueFilename = `submittedFile_${Date.now()}.cpp`;
      const filePath = path.join(process.cwd(), "uploads", uniqueFilename);
    } catch (error) {}
  }
}
