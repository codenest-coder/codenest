import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Serve React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

// SPA fallback
app.get("*", (req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(process.env.PORT || 3000);