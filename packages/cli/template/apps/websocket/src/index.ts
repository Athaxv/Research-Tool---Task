import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");
    ws.on("message", (message: unknown) => {
        console.log(`Received message => ${message}`);
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server started on port 8080");