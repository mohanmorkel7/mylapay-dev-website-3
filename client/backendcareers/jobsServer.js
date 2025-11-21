import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { fileURLToPath } from "url";

const app = express();
const PORT = 1989;

app.use(cors());
app.use(express.json());

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobsFile = path.join(__dirname, "./jobs.json");

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "strongpassword123";

// 🟢 Dynamic JWT Secret (refreshes every 1 hour)
let JWT_SECRET = crypto.randomBytes(32).toString("hex");
let lastRotation = Date.now();

function getJWTSecret() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  if (now - lastRotation > oneHour) {
    JWT_SECRET = crypto.randomBytes(32).toString("hex");
    lastRotation = now;
    console.log("♻️ JWT Secret rotated:", JWT_SECRET);
  }
  return JWT_SECRET;
}

// 🟢 LOGIN ROUTE
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, getJWTSecret(), { expiresIn: "1h" }); // token also valid for 1 hour
    console.log(token);
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: "Invalid username or password" });
});

// 🟢 Verify token
function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;

  try {
    return jwt.verify(token, getJWTSecret());
  } catch {
    return null;
  }
}

// 🟢 Helper functions
async function readJobs() {
  try {
    const data = await fs.readFile(jobsFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJobs(jobs) {
  await fs.writeFile(jobsFile, JSON.stringify(jobs, null, 2), "utf8");
}

// 🟢 Routes
app.get("/api/admin/jobs", async (req, res) => {
  try {
    const jobs = await readJobs();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to read jobs" });
  }
});

app.post("/api/admin/jobs", async (req, res) => {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const newJob = req.body;
  if (!newJob?.id || !newJob?.title)
    return res.status(400).json({ message: "id and title required" });

  const jobs = await readJobs();
  if (jobs.some((j) => j.id === newJob.id))
    return res.status(400).json({ message: "Job id already exists" });

  jobs.unshift(newJob);
  await writeJobs(jobs);
  res.status(201).json(newJob);
});

app.put("/api/admin/jobs", async (req, res) => {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const id = req.query.id;
  const update = req.body;
  if (!id) return res.status(400).json({ message: "id query required" });

  const jobs = await readJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  jobs[idx] = { ...jobs[idx], ...update };
  await writeJobs(jobs);
  res.status(200).json(jobs[idx]);
});

app.delete("/api/admin/jobs", async (req, res) => {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const id = req.query.id;
  if (!id) return res.status(400).json({ message: "id query required" });

  const jobs = await readJobs();
  const newJobs = jobs.filter((j) => j.id !== id);

  await writeJobs(newJobs);
  res.status(200).json({ message: "Deleted" });
});

// 🟢 Start server
app.listen(PORT, () => {
  console.log(`✅ Careers API running at http://localhost:${PORT}`);
});
