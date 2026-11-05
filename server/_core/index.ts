import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { groqChat, groqIsConfigured } from "./groq";
import { agentsAreConfigured, runAgent } from "./agents";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/ai/health", (_req, res) =>
    res.json({ configured: groqIsConfigured(), provider: "groq" })
  );
  app.get("/api/ai/agents/health", (_req, res) =>
    res.json({ configured: agentsAreConfigured(), provider: "groq", agents: 9 })
  );
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const result = await groqChat(req.body);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI request failed";
      const status = message.includes("not configured") ? 503 : 400;
      res.status(status).json({ error: message });
    }
  });
  app.post("/api/ai/agent", async (req, res) => {
    try {
      const result = await runAgent(req.body);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Agent request failed";
      const status = message.includes("not configured") ? 503 : 400;
      res.status(status).json({ error: message });
    }
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
