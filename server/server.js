import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import { connectDB } from "./models/user.model.js";

import { speakRouter } from "./routes/speak.router.js";
import { uploadpdf } from "./routes/pdf.router.js";
import { authRouter } from "./routes/auth.router.js";
import { handleSummaryWS } from "./controller/pdf.controller.js";
import { verifyAuthentication } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
connectDB();

app.use(cookieParser());
app.use(verifyAuthentication);

app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});


const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(speakRouter);
app.use("/pdf", uploadpdf);
app.use("/api/auth", authRouter);

wss.on("connection", (socket) => {
  console.log("New WebSocket client connected");

  socket.on("message", async (msg) => {
    try {
      const data = JSON.parse(msg);
      console.log("data is parse")
      if (!data.text) {
        socket.send(JSON.stringify({ type: "error", message: "No text provided" }));
        return;
      }

      const { text } = data;
      console.log("Received text for summary:", text);

      await handleSummaryWS(socket, text);
    } catch (err) {
      console.error("WebSocket message error:", err);
      socket.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
    }
  });

  socket.on("close", () => {
    console.log("WebSocket client disconnected");
  });

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
