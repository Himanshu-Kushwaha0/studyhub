
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });
  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("An error occurred:", err);
    res.status(status).json({ message });
  });

  // Serve static files in production
  const publicPath = path.join(process.cwd(), "dist");
  app.use(express.static(publicPath));
    
  // Serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });

  const port = process.env.PORT || 5000;
  const startServer = (retryPort: number) => {
    server.listen({
      port: retryPort,
      host: "0.0.0.0"
    })
    .on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${retryPort} is busy, trying ${retryPort + 1}...`);
        startServer(retryPort + 1);
      } else {
        console.error('Server failed to start:', e);
      }
    })
    .on('listening', () => {
      console.log(`Server running on port ${retryPort}`);
    });
  };

  startServer(port as number);
})().catch((error) => {
  console.error("Server failed to start:", error);
});
