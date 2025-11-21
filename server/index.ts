import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import geoip from "geoip-lite";
import multer from "multer";
import { handleScheduleDemo, handleContactUs, handleApplyJob } from "./routes/Sendmail";
import { fileURLToPath } from "url";
import process from "process";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create the JSON in the same folder as this script
export const VISITOR_LOG_FILE = path.join(__dirname, "visitor.json");

// Ensure file exists
if (!fs.existsSync(VISITOR_LOG_FILE)) {
  fs.writeFileSync(VISITOR_LOG_FILE, "[]", "utf8");
}

// --- Interfaces ---
interface Location {
  country: string | null;
  region: string | null;
  city: string | null;
  ll: number[] | null;
}

interface UserLog {
  ip: string;
  location: Location;
  timestamp: string;
  [key: string]: any;
}

// --- Safe JSON read helper ---
function safeReadJSON(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    console.warn("⚠️ Failed to parse visitor log, resetting file:", err);
    fs.writeFileSync(filePath, "[]", "utf-8");
    return [];
  }
}

// --- Logger function ---
function logToFile(message: string, data: any = {}): void {
  const logEntry = {
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  const existingLogs = safeReadJSON(VISITOR_LOG_FILE);
  existingLogs.push(logEntry);

  fs.writeFileSync(VISITOR_LOG_FILE, JSON.stringify(existingLogs, null, 2));
  console.log(message, data);
}

// --- Helper functions ---
const getLogs = (): UserLog[] => safeReadJSON(VISITOR_LOG_FILE);

const saveLogs = (logs: UserLog[]) =>
  fs.writeFileSync(VISITOR_LOG_FILE, JSON.stringify(logs, null, 2));

// --- Create Express server ---
export function createServer(): Express {
  const app: Express = express();

  app.set("trust proxy", true);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Multer setup for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 6 * 1024 * 1024 },
    fileFilter: (_req: Request, file: Express.Multer.File, cb) => {
      const allowed = ["application/pdf", "application/msword"];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Unsupported file type. Only PDF and DOC are allowed."));
    },
  });

  // --- Routes ---
  app.get("/api/ping", (_req: Request, res: Response) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.post("/api/sendmail/schedule", handleScheduleDemo);
  app.post("/api/sendmail/contact", handleContactUs);
  app.post("/api/sendmail/apply-job", upload.single("resume"), handleApplyJob);

  // --- Manual log ---
app.post("/api/log-user", (req: Request, res: Response) => {
  try {
    const data = req.body;
    const ip = req.ip;
    const geo = geoip.lookup(ip) || {};

    const location: Location = {
      country: geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
      ll: geo.ll || null,
    };

    const logs = getLogs();
    const lastLog = logs[logs.length - 1];

    // ⛔ Prevent same IP logging within 5 seconds
    if (
      lastLog &&
      lastLog.ip === ip &&
      Date.now() - new Date(lastLog.timestamp).getTime() < 5000
    ) {
      return res.json({ message: "Duplicate ignored" });
    }

    const newLog: UserLog = {
      ...data,
      ip,
      location,
      timestamp: new Date().toISOString(),
    };

    logs.push(newLog);
    saveLogs(logs); // ✅ this actually writes the file ONCE

    console.log("✅ User log saved:", newLog); // ✅ console only (not written to file)
    res.json({ message: "User log saved successfully!" });
  } catch (err: any) {
    console.error("❌ Error saving user log:", err);
    res.status(500).json({ message: "Failed to save log" });
  }
});

  // --- Automatic visitor log ---
  app.get("/api/track-visitor", (_req: Request, res: Response) => {
    try {
      const ip = _req.ip;
      const geo = geoip.lookup(ip) || {};
      const location: Location = {
        country: geo.country || null,
        region: geo.region || null,
        city: geo.city || null,
        ll: geo.ll || null,
      };

      const logs = getLogs();
      const lastLog = logs[logs.length - 1];

      if (lastLog && lastLog.ip === ip && Date.now() - new Date(lastLog.timestamp).getTime() < 5000) {
        logToFile("⚠️ Duplicate visitor log ignored", { ip });
        return res.json({ message: "Duplicate ignored" });
      }

      const newLog: UserLog = { ip, location, timestamp: new Date().toISOString() };
      logs.push(newLog);
      saveLogs(logs);

      logToFile("📝 Visitor logged automatically", { ip, location });
      res.json({ message: "Visitor logged successfully!" });
    } catch (err: any) {
      logToFile("❌ Error logging visitor", { error: err.message });
      res.status(500).json({ message: "Failed to log visitor" });
    }
  });

  return app;
}
