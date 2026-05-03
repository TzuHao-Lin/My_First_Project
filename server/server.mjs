import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 8787);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(__dirname, "data");
const analyticsFile = join(dataDir, "analytics-events.json");

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://tzuhao-lin.github.io"
];

const emptyAnalytics = () => ({
  version: "2026-05-01",
  savedAt: null,
  events: []
});

const sendJson = (response, statusCode, payload, origin = "") => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
};

const normalizeOrigin = (origin) => (allowedOrigins.includes(origin) ? origin : "");

const ensureStore = async () => {
  await mkdir(dataDir, { recursive: true });

  if (!existsSync(analyticsFile)) {
    await writeFile(analyticsFile, JSON.stringify(emptyAnalytics(), null, 2), "utf8");
  }
};

const readAnalytics = async () => {
  await ensureStore();

  try {
    const raw = await readFile(analyticsFile, "utf8");
    return JSON.parse(raw);
  } catch {
    return emptyAnalytics();
  }
};

const writeAnalytics = async (analytics) => {
  const nextAnalytics = {
    ...analytics,
    savedAt: new Date().toISOString()
  };

  await ensureStore();
  await writeFile(analyticsFile, JSON.stringify(nextAnalytics, null, 2), "utf8");
  return nextAnalytics;
};

const getSummary = (analytics) => ({
  eventCount: analytics.events.length,
  lastEventAt: analytics.events[analytics.events.length - 1]?.at ?? null,
  sampleEvents: analytics.events.slice(-5).map((event) => ({
    id: event.id,
    name: event.name,
    at: event.at
  }))
});

const collectBody = async (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();

      if (body.length > 1024 * 1024) {
        reject(new Error("Payload too large"));
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });

const sanitizeEvent = (payload) => ({
  id: String(payload.id || `evt-${Date.now()}`),
  name: String(payload.name || "unknown"),
  at: String(payload.at || new Date().toISOString()),
  anonymousUserId: String(payload.anonymousUserId || "anonymous"),
  payload: payload.payload && typeof payload.payload === "object" ? payload.payload : {}
});

const server = createServer(async (request, response) => {
  const origin = normalizeOrigin(request.headers.origin || "");
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS"
    });
    response.end();
    return;
  }

  if (url.pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true, service: "career-explorer-api" }, origin);
    return;
  }

  if (url.pathname === "/api/analytics/summary" && request.method === "GET") {
    const analytics = await readAnalytics();
    sendJson(response, 200, getSummary(analytics), origin);
    return;
  }

  if (url.pathname === "/api/analytics/export" && request.method === "GET") {
    const analytics = await readAnalytics();
    sendJson(response, 200, analytics, origin);
    return;
  }

  if (url.pathname === "/api/analytics/events" && request.method === "POST") {
    try {
      const body = await collectBody(request);
      const event = sanitizeEvent(body);
      const analytics = await readAnalytics();
      const nextAnalytics = await writeAnalytics({
        ...analytics,
        events: [...analytics.events, event].slice(-5000)
      });

      sendJson(
        response,
        201,
        {
          ok: true,
          summary: getSummary(nextAnalytics)
        },
        origin
      );
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message }, origin);
    }
    return;
  }

  if (url.pathname === "/api/analytics/events" && request.method === "DELETE") {
    const analytics = await writeAnalytics(emptyAnalytics());
    sendJson(response, 200, { ok: true, summary: getSummary(analytics) }, origin);
    return;
  }

  sendJson(response, 404, { ok: false, error: "Not found" }, origin);
});

server.listen(PORT, () => {
  console.log(`Career Explorer API running on http://localhost:${PORT}`);
});
