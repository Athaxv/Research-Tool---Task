import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const server = app.listen(3000, () => {
    console.log("Server started on port 3000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send("Hello! Message From Server!!");
});