import { WebSocket } from "ws";

export const connectMurfWs = (text, voiceId, socket) => {

  const murfWs = new WebSocket(`wss://api.murf.ai/v1/speech/stream-input?api-key=${process.env.MURF_API_KEY}`);

  murfWs.on("open", () => {
    murfWs.send(JSON.stringify({
      voice: voiceId,
      text,
      context_id: socket.id,
      end: true
    }));
  });

  murfWs.on("message", (msg) => {
    const data = JSON.parse(msg);
    if (data.audio_chunk) socket.emit("audio-chunk", data.audio_chunk);
    if (data.status === "done") {
      socket.emit("audio-done");
      murfWs.close();
    }
  });

  murfWs.on("error", (err) => socket.emit("error", err.message));
}