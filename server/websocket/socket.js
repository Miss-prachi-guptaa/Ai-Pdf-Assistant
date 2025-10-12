import { Server } from "socket.io"; import { connectMurfWs } from "../utils/murfWsHelper.js";
;

export const setupSocket = (server) => {

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("speak-text", ({ text, voiceId }) => {
      connectMurfWs(text, voiceId, socket);
    });
    socket.on("disconnect", () => {
      console.log("Cleint Disconnected:", socket.id);
    });
  });



  return io;
}