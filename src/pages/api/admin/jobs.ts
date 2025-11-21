// pages/api/admin/jobs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const jobsFile = path.join(process.cwd(), "data", "jobs.json");

async function readJobs() {
  try {
    const raw = await fs.readFile(jobsFile, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
async function writeJobs(jobs: any[]) {
  await fs.writeFile(jobsFile, JSON.stringify(jobs, null, 2), "utf8");
}

function verifyToken(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const parts = auth.split(" ");
  if (parts.length !== 2) return null;
  const token = parts[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    const jobs = await readJobs();
    return res.status(200).json(jobs);
  }

  // Protected methods: POST (create), PUT (update), DELETE (delete)
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (method === "POST") {
    const newJob = req.body;
    if (!newJob?.id || !newJob?.title) {
      return res.status(400).json({ message: "id and title required" });
    }
    const jobs = await readJobs();
    if (jobs.some((j: any) => j.id === newJob.id)) {
      return res.status(400).json({ message: "Job id already exists" });
    }
    jobs.unshift(newJob); // put newest at top
    await writeJobs(jobs);
    return res.status(201).json(newJob);
  }

  if (method === "PUT") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const update = req.body;
    if (!id) return res.status(400).json({ message: "id query required" });
    const jobs = await readJobs();
    const idx = jobs.findIndex((j: any) => j.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });
    jobs[idx] = { ...jobs[idx], ...update };
    await writeJobs(jobs);
    return res.status(200).json(jobs[idx]);
  }

  if (method === "DELETE") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    if (!id) return res.status(400).json({ message: "id query required" });
    let jobs = await readJobs();
    jobs = jobs.filter((j: any) => j.id !== id);
    await writeJobs(jobs);
    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
