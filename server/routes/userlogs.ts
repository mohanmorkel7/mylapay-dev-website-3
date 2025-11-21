
import { Router } from "express";
import fs from "fs";

const router = Router();
const logFilePath = "userLogs.json";

// Save logs to JSON
function saveLog(log: any) {
  let logs: any[] = [];
  if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
  }
  logs.push(log);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}

// POST /api/log-user
router.post("/log-user", async (req, res) => {
  const sessionId = req.body.sessionId || `sess_${Math.random().toString(36).slice(2, 10)}`;
  const duration = req.body.duration || 0;

  // Get IP from request headers or socket
  let ip = req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "";

  // Remove IPv6 prefix if present
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");

  // Initialize geo info
  let latitude: number | null = null;
  let longitude: number | null = null;
  let city: string | null = null;
  let region: string | null = null;
  let country: string | null = null;

  // Fetch geo location from IP
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    latitude = geoData.latitude || null;
    longitude = geoData.longitude || null;
    city = geoData.city || null;
    region = geoData.region || null;
    country = geoData.country_name || null;
  } catch (err) {
    console.log("Geo API error:", err);
  }

  const log = {
    sessionId,
    timestamp: new Date().toISOString(),
    ip,
    latitude,
    longitude,
    city,
    region,
    country,
    duration,
  };

  saveLog(log);
  res.json({ message: "Log saved" });
});

export default router;
