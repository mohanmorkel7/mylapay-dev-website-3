// logger.js
import fs from "fs";

const LOG_FILE = "visitorLog.json";

export function logToFile(message, data = {}) {
  const logEntry = {
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  // ✅ Append to file (instead of overwriting)
  const existing = fs.existsSync(LOG_FILE)
    ? JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"))
    : [];

  existing.push(logEntry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(existing, null, 2));

  // ✅ Still show in console
  console.log(message, data);
}
