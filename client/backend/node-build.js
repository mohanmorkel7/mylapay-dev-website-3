import path from "path";
import { createServer } from "./index.js";
import * as express from "express";
import { fileURLToPath } from "url";
const app = createServer();
const port = process.env.PORT || 1995;
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const distPath = path.join(_dirname, "../../dist/spa");
app.use(express.static(distPath));
app.use((req, res, next) => {
    if (req.method !== "GET" ||
        req.path.startsWith("/api") ||
        req.path.startsWith("/health")) {
        return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
    console.log(`🚀 Fusion Starter server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
});
// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("🛑 Received SIGTERM, shutting down gracefully");
    process.exit(0);
});
process.on("SIGINT", () => {
    console.log("🛑 Received SIGINT, shutting down gracefully");
    process.exit(0);
});
