import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import geoip from "geoip-lite";
import multer from "multer";
import { handleDemo } from "./routes/demo.js";
import { handleScheduleDemo, handleContactUs, handleApplyJob } from "./routes/Sendmail.js";

import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// ✅ Custom logger function
function logToFilee(message, data = {}) {
    const logFile = path.join(_dirname, "visitorLog.json"); // absolute path

    const logEntry = {
        message,
        data,
        timestamp: new Date().toISOString(),
    };

    let existingLogs = [];
    try {
        if (fs.existsSync(logFile)) {
            existingLogs = JSON.parse(fs.readFileSync(logFile, "utf-8"));
        }
    } catch (err) {
        console.error("Error reading log file:", err.message);
    }

    existingLogs.push(logEntry);

    try {
        fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));
    } catch (err) {
        console.error("Error writing log file:", err.message);
    }

    console.log(message, data);
}


export function createServer() {
    const app = express();

    // ⚡ Trust proxy to get real client IP if behind reverse proxy
    app.set("trust proxy", true);

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // --- Mail routes ---
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 6 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            const allowed = ["application/pdf", "application/msword"];
            if (allowed.includes(file.mimetype)) cb(null, true);
            else cb(new Error("Unsupported file type. Only PDF and DOC are allowed."));
        },
    });

    // --- Routes ---
    app.get("/api/ping", (_req, res) => {
        const ping = process.env.PING_MESSAGE ?? "ping";
        res.json({ message: ping });
    });

    app.get("/api/demo", handleDemo);
    app.post("/api/sendmail/schedule", handleScheduleDemo);
    app.post("/api/sendmail/contact", handleContactUs);
    app.post("/api/sendmail/apply-job", upload.single("resume"), handleApplyJob);

    // Utility function to load & save logs safely
    const getLogs = () => (fs.existsSync("userLogs.json")
        ? JSON.parse(fs.readFileSync("userLogs.json", "utf-8"))
        : []);

    const saveLogs = (logs) => fs.writeFileSync("userLogs.json", JSON.stringify(logs, null, 2));

    // --- POST: manual log route ---
    app.post("/api/log-user", (req, res) => {
        try {
            const data = req.body;
            const ip = req.ip;
            const geo = geoip.lookup(ip) || {};
            const location = {
                country: geo.country || null,
                region: geo.region || null,
                city: geo.city || null,
                ll: geo.ll || null,
            };

            const logs = getLogs();
            const lastLog = logs[logs.length - 1];

            // 🧩 Prevent duplicate logs within 5 seconds for same IP
            if (lastLog && lastLog.ip === ip && Date.now() - new Date(lastLog.timestamp).getTime() < 5000) {
                // logToFilee("⚠️ Duplicate user log ignored", { ip });
                return res.json({ message: "Duplicate ignored" });
            }

            logs.push({
                ...data,
                ip,
                location,
                timestamp: new Date().toISOString(),
            });

            saveLogs(logs);

            logToFilee("User log saved", { ...data, ip, location });
            res.json({ message: "User log saved successfully!" });
        } catch (err) {
            logToFilee("❌ Error saving user log", { error: err.message });
            res.status(500).json({ message: "Failed to save log" });
        }
    });

    // --- GET: automatic visitor log ---
    app.get("/api/track-visitor", (_req, res) => {
        try {
            const ip = _req.ip;
            const geo = geoip.lookup(ip) || {};
            const location = {
                country: geo.country || null,
                region: geo.region || null,
                city: geo.city || null,
                ll: geo.ll || null,
            };

            const logs = getLogs();
            const lastLog = logs[logs.length - 1];

            // 🧩 Prevent duplicate logs within 5 seconds for same IP
            if (lastLog && lastLog.ip === ip && Date.now() - new Date(lastLog.timestamp).getTime() < 5000) {
                logToFilee("⚠️ Duplicate visitor log ignored", { ip });
                return res.json({ message: "Duplicate ignored" });
            }

            logs.push({
                ip,
                location,
                timestamp: new Date().toISOString(),
            });

            saveLogs(logs);

            logToFilee("📝 Visitor logged automatically", { ip, location });
            res.json({ message: "Visitor logged successfully!" });
        } catch (err) {
            logToFilee("❌ Error logging visitor", { error: err.message });
            res.status(500).json({ message: "Failed to log visitor" });
        }
    });

    return app;
}
