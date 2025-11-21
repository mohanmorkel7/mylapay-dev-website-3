// scripts/createVisitorLog.js
import fs from "fs";
import path from "path";

// Path to your dist/server folder
const serverDistPath = path.join(process.cwd(), "dist", "server");
const visitorLogPath = path.join(serverDistPath, "visitorLog.json");

// Ensure dist/server folder exists
if (!fs.existsSync(serverDistPath)) {
  fs.mkdirSync(serverDistPath, { recursive: true });
}

// Create visitorLog.json if it doesn’t exist
if (!fs.existsSync(visitorLogPath)) {
  fs.writeFileSync(visitorLogPath, "[]", "utf-8");
  console.log("✅ visitorLog.json created in dist/server folder");
} else {
  console.log("⚠️ visitorLog.json already exists in dist/server folder");
}
