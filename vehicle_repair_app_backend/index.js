const http = require("http");
const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
    // startHelping, stopHelping, requestHelp, cancelHelp
    ws.on("startHelping", function incoming(message, isBinary) {
        console.log(message.toString(), isBinary);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on("stopHelping", function incoming(message, isBinary) {
        console.log(message.toString(), isBinary);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on("requestHelp", function incoming(message, isBinary) {
        console.log(message.toString(), isBinary);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on("cancelHelp", function incoming(message, isBinary) {
        console.log(message.toString(), isBinary);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

server.listen(8080, () => {
    console.log("Listening to port 8080");
});
